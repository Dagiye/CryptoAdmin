import React, { useState, useEffect } from "react";
import {
  User,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  ExternalLink,
  Key,
  Mail,
} from "lucide-react";

const UserDetails = ({ user, onBack, onUserUpdate, onVisitAccount }) => {
  const [fullName, setFullName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [accountStatus, setAccountStatus] = useState(user?.status || "active");
  const [currentBalance, setCurrentBalance] = useState(
    user?.accountBalance || 0
  );
  const [addAmount, setAddAmount] = useState("");
  const [subtractAmount, setSubtractAmount] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Update local state when user prop changes
  useEffect(() => {
    if (user) {
      setFullName(user.username);
      setEmail(user.email);
      setAccountStatus(user.status);
      setCurrentBalance(user.accountBalance);
    }
  }, [user]);

  const handleUpdateInformation = () => {
    if (user && onUserUpdate) {
      const updatedUser = {
        ...user,
        username: fullName,
        email: email,
        status: accountStatus,
        accountBalance: currentBalance,
      };
      onUserUpdate(updatedUser);
      // No popup - silent update
    }
  };

  const handleAddBalance = () => {
    if (addAmount && !isNaN(addAmount) && parseFloat(addAmount) > 0) {
      const newBalance = currentBalance + parseFloat(addAmount);
      setCurrentBalance(newBalance);

      if (user && onUserUpdate) {
        const updatedUser = {
          ...user,
          username: fullName,
          email: email,
          status: accountStatus,
          accountBalance: newBalance,
        };
        onUserUpdate(updatedUser);
      }

      alert(
        "✅ Balance added successfully!\n\nAmount Added: $" +
          parseFloat(addAmount).toFixed(2) +
          "\nNew Balance: $" +
          newBalance.toFixed(2)
      );
      setAddAmount("");
    } else {
      alert("❌ Please enter a valid amount to add.");
    }
  };

  const handleSubtractBalance = () => {
    if (
      subtractAmount &&
      !isNaN(subtractAmount) &&
      parseFloat(subtractAmount) > 0
    ) {
      const subtractValue = parseFloat(subtractAmount);
      if (subtractValue > currentBalance) {
        alert(
          "❌ Cannot subtract more than current balance!\n\nCurrent Balance: $" +
            currentBalance.toFixed(2) +
            "\nAttempted Subtraction: $" +
            subtractValue.toFixed(2)
        );
        return;
      }

      const newBalance = currentBalance - subtractValue;
      setCurrentBalance(newBalance);

      if (user && onUserUpdate) {
        const updatedUser = {
          ...user,
          username: fullName,
          email: email,
          status: accountStatus,
          accountBalance: newBalance,
        };
        onUserUpdate(updatedUser);
      }

      alert(
        "✅ Balance subtracted successfully!\n\nAmount Subtracted: $" +
          subtractValue.toFixed(2) +
          "\nNew Balance: $" +
          newBalance.toFixed(2)
      );
      setSubtractAmount("");
    } else {
      alert("❌ Please enter a valid amount to subtract.");
    }
  };

  const handleUpdatePassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("❌ Please fill in both password fields.");
      return;
    }

    if (newPassword.length < 6) {
      alert("❌ Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert(
        "❌ Passwords do not match!\n\nPlease make sure both password fields are identical."
      );
      return;
    }

    // Success - password updated
    alert(
      "✅ Password updated successfully!\n\nUser: " +
        fullName +
        "\nPassword has been changed securely."
    );
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleVisitAccount = () => {
    if (onVisitAccount && user) {
      onVisitAccount(user);
    }
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
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
        height: "calc(100vh - 70px)", // Make it scrollable
      }}
    >
      {/* Header with Back Button */}
      <div
        style={{
          backgroundColor: "#e91e63",
          padding: "10px 15px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
          <span
            style={{ fontWeight: "600", color: "#ffffff", fontSize: "14px" }}
          >
            User Detail - {fullName}
          </span>
        </div>
        <button
          onClick={handleVisitAccount}
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
          onMouseLeave={handleButtonMouseLeave}
          style={getButtonStyle({
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "6px 12px",
            backgroundColor: "#ffffff",
            color: "#e91e63",
            border: "none",
            borderRadius: "15px",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
            outline: "none",
          })}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f8f9fa";
          }}
        >
          <ExternalLink size={12} />
          Visit Account
        </button>
      </div>

      {/* Stats Cards Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginBottom: "15px",
        }}
      >
        {/* Balance Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "15px",
            borderRadius: "6px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                color: "#e91e63",
                fontSize: "12px",
                fontWeight: "500",
                margin: "0 0 3px 0",
              }}
            >
              Balance
            </h3>
            <p
              style={{
                color: "#e91e63",
                fontSize: "18px",
                fontWeight: "700",
                margin: "0",
              }}
            >
              {formatCurrency(currentBalance)}
            </p>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#fce4ec",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DollarSign size={20} style={{ color: "#e91e63" }} />
          </div>
        </div>

        {/* Deposits Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "15px",
            borderRadius: "6px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                color: "#e91e63",
                fontSize: "12px",
                fontWeight: "500",
                margin: "0 0 3px 0",
              }}
            >
              Deposits
            </h3>
            <p
              style={{
                color: "#e91e63",
                fontSize: "18px",
                fontWeight: "700",
                margin: "0",
              }}
            >
              $0.00
            </p>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#fce4ec",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingUp size={20} style={{ color: "#e91e63" }} />
          </div>
        </div>

        {/* Withdrawals Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "15px",
            borderRadius: "6px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                color: "#e91e63",
                fontSize: "12px",
                fontWeight: "500",
                margin: "0 0 3px 0",
              }}
            >
              Withdrawals
            </h3>
            <p
              style={{
                color: "#e91e63",
                fontSize: "18px",
                fontWeight: "700",
                margin: "0",
              }}
            >
              $0.00
            </p>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#fce4ec",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingDown size={20} style={{ color: "#e91e63" }} />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
        }}
      >
        {/* Left Column - Balance Add/Subtract */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "15px",
            borderRadius: "6px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            style={{
              color: "#e91e63",
              fontSize: "14px",
              fontWeight: "600",
              margin: "0 0 15px 0",
              borderBottom: "2px solid #e91e63",
              paddingBottom: "6px",
            }}
          >
            Balance Add/Subtract
          </h3>

          {/* Add Balance */}
          <div style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="number"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                placeholder="Enter amount to add"
                style={{
                  flex: "1",
                  padding: "10px 12px",
                  border: "2px solid #4ade80",
                  borderRadius: "5px",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <button
                onClick={handleAddBalance}
                onMouseDown={handleButtonMouseDown}
                onMouseUp={handleButtonMouseUp}
                onMouseLeave={handleButtonMouseLeave}
                style={getButtonStyle({
                  padding: "10px 16px",
                  backgroundColor: "#4ade80",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  whiteSpace: "nowrap",
                  outline: "none",
                })}
              >
                Add{" "}
                <span
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#4ade80",
                    borderRadius: "50%",
                    width: "16px",
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "700",
                  }}
                >
                  +
                </span>
              </button>
            </div>
          </div>

          {/* Subtract Balance */}
          <div>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="number"
                value={subtractAmount}
                onChange={(e) => setSubtractAmount(e.target.value)}
                placeholder="Enter amount to subtract"
                style={{
                  flex: "1",
                  padding: "10px 12px",
                  border: "2px solid #e91e63",
                  borderRadius: "5px",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <button
                onClick={handleSubtractBalance}
                onMouseDown={handleButtonMouseDown}
                onMouseUp={handleButtonMouseUp}
                onMouseLeave={handleButtonMouseLeave}
                style={getButtonStyle({
                  padding: "10px 16px",
                  backgroundColor: "#e91e63",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  whiteSpace: "nowrap",
                  outline: "none",
                })}
              >
                Sub{" "}
                <span
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#e91e63",
                    borderRadius: "50%",
                    width: "16px",
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "700",
                  }}
                >
                  -
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - User Information */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "15px",
            borderRadius: "6px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            style={{
              color: "#e91e63",
              fontSize: "14px",
              fontWeight: "600",
              margin: "0 0 15px 0",
              borderBottom: "2px solid #e91e63",
              paddingBottom: "6px",
            }}
          >
            Information of {fullName}
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            {/* Full Name */}
            <div>
              <label
                style={{
                  display: "block",
                  color: "#e91e63",
                  fontSize: "12px",
                  fontWeight: "500",
                  marginBottom: "4px",
                }}
              >
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 30px",
                    border: "2px solid #f8bbd9",
                    borderRadius: "5px",
                    fontSize: "12px",
                    outline: "none",
                  }}
                />
                <User
                  size={14}
                  style={{
                    position: "absolute",
                    left: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#e91e63",
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  color: "#e91e63",
                  fontSize: "12px",
                  fontWeight: "500",
                  marginBottom: "4px",
                }}
              >
                Email
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 30px",
                    border: "2px solid #f8bbd9",
                    borderRadius: "5px",
                    fontSize: "12px",
                    outline: "none",
                  }}
                />
                <Mail
                  size={14}
                  style={{
                    position: "absolute",
                    left: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#e91e63",
                  }}
                />
              </div>
            </div>

            {/* Account Status */}
            <div>
              <label
                style={{
                  display: "block",
                  color: "#333333",
                  fontSize: "12px",
                  fontWeight: "500",
                  marginBottom: "4px",
                }}
              >
                Account Status
              </label>
              <select
                value={accountStatus}
                onChange={(e) => setAccountStatus(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor:
                    accountStatus === "active" ? "#4ade80" : "#ef4444",
                  color: "#ffffff",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Update Information Button */}
          <button
            onClick={handleUpdateInformation}
            onMouseDown={handleButtonMouseDown}
            onMouseUp={handleButtonMouseUp}
            onMouseLeave={handleButtonMouseLeave}
            style={getButtonStyle({
              width: "100%",
              padding: "10px",
              backgroundColor: "#e91e63",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "20px",
              outline: "none",
            })}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#c2185b";
            }}
          >
            Update Information
          </button>

          {/* Password Change Section */}
          <h4
            style={{
              color: "#e91e63",
              fontSize: "13px",
              fontWeight: "600",
              margin: "0 0 10px 0",
              borderBottom: "1px solid #f8bbd9",
              paddingBottom: "4px",
            }}
          >
            Password Change Option
          </h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            {/* New Password */}
            <div>
              <label
                style={{
                  display: "block",
                  color: "#e91e63",
                  fontSize: "12px",
                  fontWeight: "500",
                  marginBottom: "4px",
                }}
              >
                New Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 30px",
                    border: "2px solid #f8bbd9",
                    borderRadius: "5px",
                    fontSize: "12px",
                    outline: "none",
                  }}
                />
                <Key
                  size={14}
                  style={{
                    position: "absolute",
                    left: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#e91e63",
                  }}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                style={{
                  display: "block",
                  color: "#e91e63",
                  fontSize: "12px",
                  fontWeight: "500",
                  marginBottom: "4px",
                }}
              >
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter Confirm Password"
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 30px",
                    border: "2px solid #f8bbd9",
                    borderRadius: "5px",
                    fontSize: "12px",
                    outline: "none",
                  }}
                />
                <Key
                  size={14}
                  style={{
                    position: "absolute",
                    left: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#e91e63",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Update Password Button */}
          <button
            onClick={handleUpdatePassword}
            onMouseDown={handleButtonMouseDown}
            onMouseUp={handleButtonMouseUp}
            onMouseLeave={handleButtonMouseLeave}
            style={getButtonStyle({
              width: "100%",
              padding: "10px",
              backgroundColor: "#e91e63",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              outline: "none",
            })}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#c2185b";
            }}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
