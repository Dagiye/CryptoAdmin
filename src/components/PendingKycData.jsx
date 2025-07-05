import React, { useState } from "react";

const PendingKycData = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample KYC data - empty for "No Logs Found" state
  const allKycData = [];

  return (
    <div className="pending-kyc-data">
      <div className="kyc-header">
        <div className="kyc-header-left">
          <h1 className="kyc-title">Pending Kyc Data</h1>
          <p className="kyc-subtitle">Manage Pending Kyc Data from Here</p>
        </div>
      </div>

      <div className="kyc-table-section">
        <div className="kyc-table-header">
          <div className="kyc-icon">📝</div>
          <h2 className="kyc-table-title">Logs</h2>
        </div>

        <div className="kyc-table-container">
          <table className="kyc-table">
            <thead>
              <tr>
                <th>User</th>
                <th>KYC Data</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allKycData.length > 0
                ? allKycData.map((data) => (
                    <tr key={data.id}>
                      <td className="kyc-user">{data.user}</td>
                      <td className="kyc-data">{data.kycData}</td>
                      <td>
                        <span className={`kyc-status-badge ${data.status}`}>
                          {data.status.charAt(0).toUpperCase() +
                            data.status.slice(1)}
                        </span>
                      </td>
                      <td className="kyc-action">{data.action}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>

        {/* No Logs Found - OUTSIDE white table area */}
        {allKycData.length === 0 && (
          <div className="no-kyc-logs">
            <div className="no-kyc-logs-icon">⚠️</div>
            <p className="no-kyc-logs-text">No Logs Found!</p>
          </div>
        )}

        <div className="kyc-pagination">
          <button
            className="kyc-pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            className="kyc-pagination-btn"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingKycData;
