import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import './WithdrawLogs.css';

const WithdrawLogs = () => {
  const [withdrawLogs, setWithdrawLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('Pending');

  useEffect(() => {
    // Empty for demo - in production, replace with API call to your Node.js backend
    // Example: fetchWithdrawLogs();
    setWithdrawLogs([]);
    setFilteredLogs([]);
  }, []);

  useEffect(() => {
    const filtered = withdrawLogs.filter(log =>
      (log.gateway.toLowerCase().includes(searchTerm.toLowerCase()) ||
       log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
       log.paymentAddress.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'All' || log.status === statusFilter)
    );
    setFilteredLogs(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, withdrawLogs, statusFilter]);

  // Function to fetch withdraw logs from Node.js backend
  const fetchWithdrawLogs = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/withdraw-logs');
      const data = await response.json();
      setWithdrawLogs(data);
      setFilteredLogs(data);
    } catch (error) {
      console.error('Error fetching withdraw logs:', error);
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

  const formatNeedToPay = (needToPay) => {
    return `$${needToPay.toFixed(2)}`;
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
    <div className="withdraw-logs-container">
      <div className="withdraw-logs-header">
        <div className="header-content">
          <h1 className="page-title">All Withdraw Logs</h1>
         
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
 <p className="page-subtitle">Manage All Withdraw Logs from Here</p>
      <div className="withdraw-logs-card">
        <div className="card-header">
          <h2 className="card-title">📊 Logs</h2>
        </div>
        
        <div className="table-container">
          <table className="withdraw-logs-table">
            <thead>
              <tr>
                <th>Gateway</th>
                <th>User</th>
                <th>Amount</th>
                <th>Charge</th>
                <th>Need To Pay</th>
                <th>Payment Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log) => (
                <tr key={log.id} className="withdraw-row">
                  <td className="gateway-cell">
                    <span className="gateway-name">{log.gateway}</span>
                  </td>
                  <td className="user-cell">
                    <span className="username">{log.user}</span>
                  </td>
                  <td className="amount-cell">
                    <span className="amount">{formatAmount(log.amount)}</span>
                  </td>
                  <td className="charge-cell">
                    <span className="charge">{formatCharge(log.charge)}</span>
                  </td>
                  <td className="need-to-pay-cell">
                    <span className="need-to-pay">{formatNeedToPay(log.needToPay)}</span>
                  </td>
                  <td className="payment-address-cell">
                    <span className="payment-address">{log.paymentAddress}</span>
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

export default WithdrawLogs;