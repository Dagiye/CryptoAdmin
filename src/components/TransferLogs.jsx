import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import './TransferLogs.css';

const TransferLogs = () => {
  const [transferLogs, setTransferLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Empty for demo - in production, replace with API call to your Node.js backend
    // Example: fetchTransferLogs();
    setTransferLogs([]);
    setFilteredLogs([]);
  }, []);

  useEffect(() => {
    const filtered = transferLogs.filter(log =>
      log.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.amount.toString().includes(searchTerm)
    );
    setFilteredLogs(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, transferLogs]);

  // Function to fetch transfer logs from Node.js backend
  const fetchTransferLogs = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/transfer-logs');
      const data = await response.json();
      setTransferLogs(data);
      setFilteredLogs(data);
    } catch (error) {
      console.error('Error fetching transfer logs:', error);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

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
    return `$${amount.toFixed(2)}`;
  };

  const formatCharge = (charge) => {
    return `$${charge.toFixed(2)}`;
  };

  const formatAfterCharge = (afterCharge) => {
    return `$${afterCharge.toFixed(2)}`;
  };

  return (
    <div className="transfer-logs-container">
      <div className="transfer-logs-header">
        <div className="header-content">
          <h1 className="page-title">All TransferLogs</h1>
          
        </div>
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
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
<p className="page-subtitle">Manage All Transferlogs from Here</p>
      <div className="transfer-logs-card">
        <div className="card-header">
          <h2 className="card-title">📊 Transferlogs</h2>
        </div>
        
        <div className="table-container">
          <table className="transfer-logs-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Charge</th>
                <th>After Charge</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log) => (
                <tr key={log.id} className="transfer-row">
                  <td className="sender-cell">
                    <span className="username">{log.sender}</span>
                  </td>
                  <td className="receiver-cell">
                    <span className="username">{log.receiver}</span>
                  </td>
                  <td className="amount-cell">
                    <span className="amount orange">{formatAmount(log.amount)}</span>
                  </td>
                  <td className="charge-cell">
                    <span className="charge red">{formatCharge(log.charge)}</span>
                  </td>
                  <td className="after-charge-cell">
                    <span className="after-charge green">{formatAfterCharge(log.afterCharge)}</span>
                  </td>
                  <td className="time-cell">
                    <span className="timestamp">{log.timestamp}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="no-results">
            <p>No transfer logs available. Connect your Node.js backend to display transfer data.</p>
          </div>
        )}

        {filteredLogs.length > 0 && (
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
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

export default TransferLogs;