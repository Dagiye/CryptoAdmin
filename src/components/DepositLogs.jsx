import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import './DepositLogs.css';

const DepositLogs = () => {
  const [depositLogs, setDepositLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('Pending');

  useEffect(() => {
    // Empty for demo - in production, replace with API call to your Node.js backend
    // Example: fetchDepositLogs();
    setDepositLogs([]);
    setFilteredLogs([]);
  }, []);

  useEffect(() => {
    const filtered = depositLogs.filter(log =>
      (log.gateway.toLowerCase().includes(searchTerm.toLowerCase()) ||
       log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
       log.transactionId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'All' || log.status === statusFilter)
    );
    setFilteredLogs(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, depositLogs, statusFilter]);

  // Function to fetch deposit logs from Node.js backend
  const fetchDepositLogs = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/deposit-logs');
      const data = await response.json();
      setDepositLogs(data);
      setFilteredLogs(data);
    } catch (error) {
      console.error('Error fetching deposit logs:', error);
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

  const formatConversion = (conversion) => {
    return `$${conversion.toFixed(2)}`;
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="deposit-logs-container">
      <div className="deposit-logs-header">
        <div className="header-content">
          <h1 className="page-title">All Deposit Logs</h1>
          
        </div>
        <div className="header-controls">
          <div className="status-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="All">All</option>
            </select>
          </div>
        </div>
      </div>
<p className="page-subtitle">Manage All Deposit Logs from Here</p>
      <div className="deposit-logs-card">
        <div className="card-header">
          <h2 className="card-title">📊 Logs</h2>
        </div>
        
        <div className="table-container">
          <table className="deposit-logs-table">
            <thead>
              <tr>
                <th>Gateway</th>
                <th>User</th>
                <th>Amount</th>
                <th>Conversion</th>
                <th>Transaction Id</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log) => (
                <tr key={log.id} className="deposit-row">
                  <td className="gateway-cell">
                    <span className="gateway-name">{log.gateway}</span>
                  </td>
                  <td className="user-cell">
                    <span className="username">{log.user}</span>
                  </td>
                  <td className="amount-cell">
                    <span className="amount">{formatAmount(log.amount)}</span>
                  </td>
                  <td className="conversion-cell">
                    <span className="conversion">{formatConversion(log.conversion)}</span>
                  </td>
                  <td className="transaction-id-cell">
                    <span className="transaction-id">{log.transactionId}</span>
                  </td>
                  <td className="status-cell">
                    <span className={`status ${getStatusClass(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button className="action-btn view-btn">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">⚠️</div>
            <p>No Logs Found!</p>
          </div>
        )}

        {filteredLogs.length > 0 && totalPages > 1 && (
          <div className="pagination-container">
            <button 
              className="pagination-btn"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            <button 
              className="pagination-btn"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositLogs;