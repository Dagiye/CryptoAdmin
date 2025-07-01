import React, { useState } from 'react'

const DepositLogs = () => {
  const [statusFilter, setStatusFilter] = useState('pending')
  const [currentPage, setCurrentPage] = useState(1)
  
  // Sample deposit logs data
  const allLogs = [
    {
      id: 1,
      gateway: 'Bitcoin',
      user: 'dsam',
      amount: '1834.00 USDT',
      conversion: '0.02 BTC',
      transactionId: '248790',
      status: 'complete',
      action: 'Done'
    },
    {
      id: 2,
      gateway: 'Bitcoin',
      user: 'azan430',
      amount: '100.00 USDT',
      conversion: '0.00 BTC',
      transactionId: 'The fuhb',
      status: 'complete',
      action: 'Done'
    },
    {
      id: 3,
      gateway: 'USDT (TRC 20)',
      user: 'john_doe',
      amount: '500.00 USDT',
      conversion: '500.00 USDT',
      transactionId: 'TX123456',
      status: 'pending',
      action: 'Pending'
    },
    {
      id: 4,
      gateway: 'Ethereum',
      user: 'crypto_user',
      amount: '2000.00 USDT',
      conversion: '0.85 ETH',
      transactionId: 'ETH789012',
      status: 'rejected',
      action: 'Rejected'
    }
  ]

  // Filter logs based on status
  const filteredLogs = statusFilter === 'all' 
    ? allLogs 
    : allLogs.filter(log => log.status === statusFilter)

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const handleCopyTransactionId = (transactionId) => {
    navigator.clipboard.writeText(transactionId)
    alert('Transaction ID copied to clipboard!')
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'complete':
        return 'status-badge-complete'
      case 'pending':
        return 'status-badge-pending'
      case 'rejected':
        return 'status-badge-rejected'
      default:
        return 'status-badge-pending'
    }
  }

  const getActionText = (status) => {
    switch (status) {
      case 'complete':
        return 'Done'
      case 'pending':
        return 'Pending'
      case 'rejected':
        return 'Rejected'
      default:
        return 'Pending'
    }
  }

  return (
    <div className="deposit-logs">
      <div className="logs-header">
        <div className="logs-header-left">
          <h1 className="logs-title">All Deposit Logs</h1>
          <p className="logs-subtitle">Manage All Deposit Logs from Here</p>
        </div>
        <div className="logs-filter">
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="logs-table-section">
        <div className="logs-table-header">
          <div className="logs-icon">📝</div>
          <h2 className="logs-table-title">Logs</h2>
        </div>

        <div className="logs-table-container">
          {filteredLogs.length > 0 ? (
            <table className="logs-table">
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
                {filteredLogs.map(log => (
                  <tr key={log.id}>
                    <td className="log-gateway">{log.gateway}</td>
                    <td className="log-user">{log.user}</td>
                    <td className="log-amount">{log.amount}</td>
                    <td className="log-conversion">{log.conversion}</td>
                    <td className="log-transaction">
                      <span 
                        className="transaction-id"
                        onClick={() => handleCopyTransactionId(log.transactionId)}
                        title="Click to copy"
                      >
                        {log.transactionId}
                        <span className="copy-icon">📋</span>
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </td>
                    <td className="log-action">{getActionText(log.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-logs">
              <div className="no-logs-icon">⚠️</div>
              <p className="no-logs-text">No Logs Found!</p>
            </div>
          )}
        </div>

        <div className="logs-pagination">
          <button 
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          <span className="pagination-current">{currentPage}</span>
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default DepositLogs