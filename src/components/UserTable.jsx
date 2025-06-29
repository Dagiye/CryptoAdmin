import React from "react";
import { Eye } from "lucide-react";

const UserTable = ({ users, onViewDetails }) => {
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  // Button click effect styles
  const getButtonStyle = (baseStyle) => ({
    ...baseStyle,
    transition: "all 0.1s ease",
    transform: "translateY(0px)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
  });

  const handleButtonMouseDown = (e) => {
    e.target.style.transform = "translateY(1px)";
    e.target.style.boxShadow = "0 1px 1px rgba(0,0,0,0.15)";
  };

  const handleButtonMouseUp = (e) => {
    e.target.style.transform = "translateY(0px)";
    e.target.style.boxShadow = "0 1px 2px rgba(0,0,0,0.08)";
  };

  const handleButtonMouseLeave = (e) => {
    e.target.style.transform = "translateY(0px)";
    e.target.style.boxShadow = "0 1px 2px rgba(0,0,0,0.08)";
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Users Header Box - Compact size with small gap */}
      <div
        style={{
          backgroundColor: "#e91e63",
          padding: "10px 20px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
          width: "100%",
        }}
      >
        <Eye size={16} style={{ color: "#ffffff" }} />
        <span style={{ fontWeight: "600", color: "#ffffff", fontSize: "14px" }}>
          Users
        </span>
      </div>

      {/* Table Container - Separate from header */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "6px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th
                  style={{
                    padding: "12px 20px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#e91e63",
                    borderBottom: "1px solid #e9ecef",
                  }}
                >
                  Username
                </th>
                <th
                  style={{
                    padding: "12px 20px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#e91e63",
                    borderBottom: "1px solid #e9ecef",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "12px 20px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#e91e63",
                    borderBottom: "1px solid #e9ecef",
                  }}
                >
                  Account Balance
                </th>
                <th
                  style={{
                    padding: "12px 20px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#e91e63",
                    borderBottom: "1px solid #e9ecef",
                  }}
                >
                  Joined
                </th>
                <th
                  style={{
                    padding: "12px 20px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#e91e63",
                    borderBottom: "1px solid #e9ecef",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "12px 20px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#e91e63",
                    borderBottom: "1px solid #e9ecef",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  style={{
                    backgroundColor: "#ffffff",
                    borderBottom:
                      index < users.length - 1 ? "1px solid #f0f0f0" : "none",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#fce4ec";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }}
                >
                  <td style={{ padding: "12px 20px" }}>
                    <span
                      style={{
                        color: "#e91e63",
                        fontWeight: "500",
                        fontSize: "13px",
                      }}
                    >
                      {user.username}
                    </span>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span style={{ color: "#e91e63", fontSize: "13px" }}>
                      {user.email}
                    </span>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span
                      style={{
                        color: "#e91e63",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      {formatCurrency(user.accountBalance)}
                    </span>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span style={{ color: "#666666", fontSize: "13px" }}>
                      {user.joined}
                    </span>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        fontSize: "11px",
                        fontWeight: "500",
                        borderRadius: "10px",
                        backgroundColor:
                          user.status === "active" ? "#dcfce7" : "#fee2e2",
                        color: user.status === "active" ? "#166534" : "#991b1b",
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <button
                      onClick={() => onViewDetails(user.id)}
                      onMouseDown={handleButtonMouseDown}
                      onMouseUp={handleButtonMouseUp}
                      onMouseLeave={handleButtonMouseLeave}
                      style={getButtonStyle({
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "5px 10px",
                        backgroundColor: "transparent",
                        color: "#e91e63",
                        fontSize: "12px",
                        fontWeight: "500",
                        borderRadius: "12px",
                        border: "1px solid #e91e63",
                        cursor: "pointer",
                        outline: "none",
                      })}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#e91e63";
                        e.target.style.color = "#ffffff";
                      }}
                    >
                      <Eye size={12} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
