"use client"

import { useState } from "react"

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    name: "trustedcryp",
    username: "adminas430",
    email: "trustedcrypAdmin@gmail.com",
  })

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isLoadingPassword, setIsLoadingPassword] = useState(false)
  const [profileMessage, setProfileMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleUpdateProfile = async () => {
    setIsLoadingProfile(true)
    setProfileMessage("")

    // Validate fields
    if (!profileData.name || !profileData.username || !profileData.email) {
      setProfileMessage("All fields are required")
      setIsLoadingProfile(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(profileData.email)) {
      setProfileMessage("Please enter a valid email address")
      setIsLoadingProfile(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoadingProfile(false)
      setProfileMessage("Profile updated successfully!")
      setTimeout(() => setProfileMessage(""), 3000)
    }, 1500)
  }

  const handleUpdatePassword = async () => {
    setIsLoadingPassword(true)
    setPasswordMessage("")

    // Validate passwords
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordMessage("Both password fields are required")
      setIsLoadingPassword(false)
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage("Passwords do not match")
      setIsLoadingPassword(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage("Password must be at least 6 characters long")
      setIsLoadingPassword(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoadingPassword(false)
      setPasswordMessage("Password updated successfully!")
      setPasswordData({ newPassword: "", confirmPassword: "" })
      setTimeout(() => setPasswordMessage(""), 3000)
    }, 1500)
  }

  const styles = {
    container: {
      padding: "20px 30px",
      backgroundColor: "#fdf2f8",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      marginBottom: "30px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#e91e63",
      margin: "0 0 5px 0",
    },
    subtitle: {
      fontSize: "14px",
      color: "#9ca3af",
      margin: "0",
    },
    section: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "25px",
      marginBottom: "25px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#e91e63",
      marginBottom: "20px",
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "15px",
      marginBottom: "20px",
    },
    formRowTwo: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
      marginBottom: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#e91e63",
      marginBottom: "8px",
    },
    input: {
      padding: "12px 15px",
      border: "2px solid #e91e63",
      borderRadius: "6px",
      fontSize: "14px",
      color: "#374151",
      backgroundColor: "white",
      outline: "none",
      transition: "all 0.3s ease",
    },
    inputFocus: {
      borderColor: "#be185d",
      boxShadow: "0 0 0 3px rgba(233, 30, 99, 0.1)",
    },
    button: {
      backgroundColor: "#e91e63",
      color: "white",
      border: "none",
      padding: "15px 30px",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    buttonHover: {
      backgroundColor: "#be185d",
      transform: "translateY(-1px)",
    },
    buttonDisabled: {
      backgroundColor: "#f3b3c7",
      cursor: "not-allowed",
      transform: "none",
    },
    loadingSpinner: {
      display: "inline-block",
      width: "16px",
      height: "16px",
      border: "2px solid #ffffff",
      borderRadius: "50%",
      borderTopColor: "transparent",
      animation: "spin 1s ease-in-out infinite",
    },
    message: {
      padding: "10px 15px",
      borderRadius: "6px",
      fontSize: "14px",
      marginBottom: "15px",
      textAlign: "center",
    },
    successMessage: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    errorMessage: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    },
  }

  const [focusedInput, setFocusedInput] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(null)

  return (
    <>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Profile Setting</h1>
          <p style={styles.subtitle}>Manage Admin Profile Settings from Here</p>
        </div>

        {/* Profile Setting Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Profile Setting</h2>

          {profileMessage && (
            <div
              style={{
                ...styles.message,
                ...(profileMessage.includes("successfully") ? styles.successMessage : styles.errorMessage),
              }}
            >
              {profileMessage}
            </div>
          )}

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleProfileChange("name", e.target.value)}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput(null)}
                style={{
                  ...styles.input,
                  ...(focusedInput === "name" ? styles.inputFocus : {}),
                }}
                disabled={isLoadingProfile}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => handleProfileChange("username", e.target.value)}
                onFocus={() => setFocusedInput("username")}
                onBlur={() => setFocusedInput(null)}
                style={{
                  ...styles.input,
                  ...(focusedInput === "username" ? styles.inputFocus : {}),
                }}
                disabled={isLoadingProfile}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                style={{
                  ...styles.input,
                  ...(focusedInput === "email" ? styles.inputFocus : {}),
                }}
                disabled={isLoadingProfile}
              />
            </div>
          </div>

          <button
            onClick={handleUpdateProfile}
            disabled={isLoadingProfile}
            onMouseEnter={() => setHoveredButton("profile")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...styles.button,
              ...(hoveredButton === "profile" && !isLoadingProfile ? styles.buttonHover : {}),
              ...(isLoadingProfile ? styles.buttonDisabled : {}),
            }}
          >
            {isLoadingProfile && <span style={styles.loadingSpinner}></span>}
            {isLoadingProfile ? "Updating..." : "Update Information"}
          </button>
        </div>

        {/* Password Setting Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Password Setting</h2>

          {passwordMessage && (
            <div
              style={{
                ...styles.message,
                ...(passwordMessage.includes("successfully") ? styles.successMessage : styles.errorMessage),
              }}
            >
              {passwordMessage}
            </div>
          )}

          <div style={styles.formRowTwo}>
            <div style={styles.formGroup}>
              <label style={styles.label}>New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                onFocus={() => setFocusedInput("newPassword")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter New Password"
                style={{
                  ...styles.input,
                  ...(focusedInput === "newPassword" ? styles.inputFocus : {}),
                }}
                disabled={isLoadingPassword}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>New Password Again</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                onFocus={() => setFocusedInput("confirmPassword")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter New Password Again"
                style={{
                  ...styles.input,
                  ...(focusedInput === "confirmPassword" ? styles.inputFocus : {}),
                }}
                disabled={isLoadingPassword}
              />
            </div>
          </div>

          <button
            onClick={handleUpdatePassword}
            disabled={isLoadingPassword}
            onMouseEnter={() => setHoveredButton("password")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...styles.button,
              ...(hoveredButton === "password" && !isLoadingPassword ? styles.buttonHover : {}),
              ...(isLoadingPassword ? styles.buttonDisabled : {}),
            }}
          >
            {isLoadingPassword && <span style={styles.loadingSpinner}></span>}
            {isLoadingPassword ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </>
  )
}

export default ProfileSettings
