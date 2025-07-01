import React from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Shield,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";

const VisitAccount = ({ user, onBack }) => {
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Button click effect styles
  const getButtonStyle = (baseStyle) => ({
    ...baseStyle,
    transition: "all 0.1s ease",
    transform: "translateY(0px)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  });

  const handleButtonMouseDown = (e) => {
    e.target.style.transform = "translateY(1px)";
    e.target.style.boxShadow = "0 1px 2px rgba(0,0,0,0.2)";
  };

  const handleButtonMouseUp = (e) => {
    e.target.style.transform = "translateY(0px)";
    e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  };

  const handleButtonMouseLeave = (e) => {
    e.target.style.transform = "translateY(0px)";
    e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  };

  return (
    <div
      style={{
        flex: "1",
        backgroundColor: "#fce4ec",
        padding: "15px",
        overflow: "auto",
        height: "calc(100vh - 70px)",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#e91e63",
          padding: "10px 15px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={onBack}
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
          onMouseLeave={handleButtonMouseLeave}
          style={getButtonStyle({
            background: "none",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "5px",
            outline: "none",
            borderRadius: "3px",
          })}
        >
          <ArrowLeft size={16} />
        </button>
        <User size={14} style={{ color: "#ffffff" }} />
        <span style={{ fontWeight: "600", color: "#ffffff", fontSize: "14px" }}>
          Account Overview - {user?.username}
        </span>
      </div>

      {/* User Profile Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {/* Profile Avatar */}
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#e91e63",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: "700",
              color: "#ffffff",
            }}
          >
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {/* Profile Info */}
          <div style={{ flex: "1" }}>
            <h2
              style={{
                color: "#e91e63",
                fontSize: "24px",
                fontWeight: "700",
                margin: "0 0 5px 0",
              }}
            >
              {user?.username}
            </h2>
            <p
              style={{
                color: "#666666",
                fontSize: "14px",
                margin: "0 0 10px 0",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Mail size={14} />
              {user?.email}
            </p>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: "500",
                borderRadius: "15px",
                backgroundColor:
                  user?.status === "active" ? "#dcfce7" : "#fee2e2",
                color: user?.status === "active" ? "#166534" : "#991b1b",
              }}
            >
              <Shield
                size={12}
                style={{ marginRight: "4px", display: "inline" }}
              />
              {user?.status?.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Account Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
          }}
        >
          {/* Balance */}
          <div
            style={{
              backgroundColor: "#fce4ec",
              padding: "15px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <DollarSign
              size={24}
              style={{ color: "#e91e63", marginBottom: "8px" }}
            />
            <h3
              style={{
                color: "#e91e63",
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 3px 0",
              }}
            >
              {formatCurrency(user?.accountBalance || 0)}
            </h3>
            <p style={{ color: "#666666", fontSize: "12px", margin: "0" }}>
              Current Balance
            </p>
          </div>

          {/* Deposits */}
          <div
            style={{
              backgroundColor: "#dcfce7",
              padding: "15px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <TrendingUp
              size={24}
              style={{ color: "#16a34a", marginBottom: "8px" }}
            />
            <h3
              style={{
                color: "#16a34a",
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 3px 0",
              }}
            >
              $0.00
            </h3>
            <p style={{ color: "#666666", fontSize: "12px", margin: "0" }}>
              Total Deposits
            </p>
          </div>

          {/* Withdrawals */}
          <div
            style={{
              backgroundColor: "#fee2e2",
              padding: "15px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <TrendingDown
              size={24}
              style={{ color: "#dc2626", marginBottom: "8px" }}
            />
            <h3
              style={{
                color: "#dc2626",
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 3px 0",
              }}
            >
              $0.00
            </h3>
            <p style={{ color: "#666666", fontSize: "12px", margin: "0" }}>
              Total Withdrawals
            </p>
          </div>

          {/* Member Since */}
          <div
            style={{
              backgroundColor: "#f0f9ff",
              padding: "15px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <Calendar
              size={24}
              style={{ color: "#0284c7", marginBottom: "8px" }}
            />
            <h3
              style={{
                color: "#0284c7",
                fontSize: "14px",
                fontWeight: "700",
                margin: "0 0 3px 0",
              }}
            >
              {user?.joined}
            </h3>
            <p style={{ color: "#666666", fontSize: "12px", margin: "0" }}>
              Member Since
            </p>
          </div>
        </div>
      </div>

      {/* Account Details Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Account Information */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              color: "#e91e63",
              fontSize: "16px",
              fontWeight: "600",
              margin: "0 0 15px 0",
              borderBottom: "2px solid #e91e63",
              paddingBottom: "8px",
            }}
          >
            Account Information
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <User size={16} style={{ color: "#e91e63" }} />
              <div>
                <p style={{ color: "#666666", fontSize: "12px", margin: "0" }}>
                  Username
                </p>
                <p
                  style={{
                    color: "#333333",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0",
                  }}
                >
                  {user?.username}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Mail size={16} style={{ color: "#e91e63" }} />
              <div>
                <p style={{ color: "#666666", fontSize: "12px", margin: "0" }}>
                  Email Address
                </p>
                <p
                  style={{
                    color: "#333333",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0",
                  }}
                >
                  {user?.email}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Shield size={16} style={{ color: "#e91e63" }} />
              <div>
                <p style={{ color: "#666666", fontSize: "12px", margin: "0" }}>
                  Account Status
                </p>
                <p
                  style={{
                    color: user?.status === "active" ? "#16a34a" : "#dc2626",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0",
                    textTransform: "capitalize",
                  }}
                >
                  {user?.status}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Calendar size={16} style={{ color: "#e91e63" }} />
              <div>
                <p style={{ color: "#666666", fontSize: "12px", margin: "0" }}>
                  Join Date
                </p>
                <p
                  style={{
                    color: "#333333",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0",
                  }}
                >
                  {user?.joined}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              color: "#e91e63",
              fontSize: "16px",
              fontWeight: "600",
              margin: "0 0 15px 0",
              borderBottom: "2px solid #e91e63",
              paddingBottom: "8px",
            }}
          >
            Recent Activity
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
              }}
            >
              <Clock size={16} style={{ color: "#6c757d" }} />
              <div>
                <p
                  style={{
                    color: "#333333",
                    fontSize: "13px",
                    fontWeight: "500",
                    margin: "0",
                  }}
                >
                  Account Created
                </p>
                <p style={{ color: "#666666", fontSize: "12px", margin: "0" }}>
                  {user?.joined}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
              }}
            >
              <DollarSign size={16} style={{ color: "#6c757d" }} />
              <div>
                <p
                  style={{
                    color: "#333333",
                    fontSize: "13px",
                    fontWeight: "500",
                    margin: "0",
                  }}
                >
                  Current Balance
                </p>
                <p style={{ color: "#666666", fontSize: "12px", margin: "0" }}>
                  {formatCurrency(user?.accountBalance || 0)}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
              }}
            >
              <Shield size={16} style={{ color: "#6c757d" }} />
              <div>
                <p
                  style={{
                    color: "#333333",
                    fontSize: "13px",
                    fontWeight: "500",
                    margin: "0",
                  }}
                >
                  Account Status
                </p>
                <p
                  style={{
                    color: user?.status === "active" ? "#16a34a" : "#dc2626",
                    fontSize: "12px",
                    margin: "0",
                    textTransform: "capitalize",
                  }}
                >
                  {user?.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          marginTop: "20px",
        }}
      >
        <h3
          style={{
            color: "#e91e63",
            fontSize: "16px",
            fontWeight: "600",
            margin: "0 0 15px 0",
            borderBottom: "2px solid #e91e63",
            paddingBottom: "8px",
          }}
        >
          Quick Actions
        </h3>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={onBack}
            onMouseDown={handleButtonMouseDown}
            onMouseUp={handleButtonMouseUp}
            onMouseLeave={handleButtonMouseLeave}
            style={getButtonStyle({
              padding: "8px 16px",
              backgroundColor: "#e91e63",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              outline: "none",
            })}
          >
            <ArrowLeft size={14} />
            Back to User Details
          </button>

          <button
            onMouseDown={handleButtonMouseDown}
            onMouseUp={handleButtonMouseUp}
            onMouseLeave={handleButtonMouseLeave}
            style={getButtonStyle({
              padding: "8px 16px",
              backgroundColor: "#f8f9fa",
              color: "#666666",
              border: "1px solid #e9ecef",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              outline: "none",
            })}
          >
            <Mail size={14} />
            Send Message
          </button>

          <button
            onMouseDown={handleButtonMouseDown}
            onMouseUp={handleButtonMouseUp}
            onMouseLeave={handleButtonMouseLeave}
            style={getButtonStyle({
              padding: "8px 16px",
              backgroundColor: "#f8f9fa",
              color: "#666666",
              border: "1px solid #e9ecef",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              outline: "none",
            })}
          >
            <Clock size={14} />
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitAccount;
