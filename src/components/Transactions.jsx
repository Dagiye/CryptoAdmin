import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Empty for demo - in production, replace with API call to your Node.js backend
    // Example: fetchTransactions();
    setTransactions([]);
    setFilteredTransactions([]);
  }, []);

  useEffect(() => {
    const filtered = transactions.filter(transaction =>
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.cryptocurrency.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, transactions]);

  // Function to fetch transactions from Node.js backend
  const fetchTransactions = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatAmount = (amount) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}$${amount.toFixed(2)}`;
  };

  const formatPrice = (price) => {
    return price.toFixed(6);
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <div className="header-content">
          <h1 className="page-title">All Transactions</h1>
          
        </div>
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search details"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>
   <p className="page-subtitle">Manage All Transactions from Here</p>
      <div className="transactions-card">
        <div className="card-header">
          <h2 className="card-title">📊 Transactions</h2>
        </div>
        
        <div className="table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Details</th>
                <th>Amount</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id} className="transaction-row">
                  <td className="user-cell">
                    <span className="username">{transaction.user}</span>
                  </td>
                  <td className="details-cell">
                    <div className="trade-details">
                      <span className="trade-type">{transaction.type}</span>
                      <span className="trade-separator">|</span>
                      <span className="crypto-info">
                        {transaction.cryptocurrency} = {formatPrice(transaction.price)}
                      </span>
                      <span className="trade-separator">|</span>
                      <div className="direction-indicator">
                        {transaction.direction === 'up' ? (
                          <TrendingUp className="trend-icon up" size={14} />
                        ) : (
                          <TrendingDown className="trend-icon down" size={14} />
                        )}
                        <span className="direction-text">{transaction.direction}</span>
                      </div>
                    </div>
                  </td>
                  <td className="amount-cell">
                    <span className={`amount ${transaction.amount >= 0 ? 'profit' : 'loss'}`}>
                      {formatAmount(transaction.amount)}
                    </span>
                  </td>
                  <td className="time-cell">
                    <span className="timestamp">{transaction.timestamp}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="no-results">
            <p>No transactions available. Connect your Node.js backend to display transaction data.</p>
          </div>
        )}

        {filteredTransactions.length > 0 && totalPages > 1 && (
          <div className="pagination-container">
            <button 
              className="pagination-btn"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            
            <div className="pagination-numbers">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={page}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <button 
              className="pagination-btn"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;