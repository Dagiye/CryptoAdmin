"use client"

import { useState } from "react"

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const validUsername = import.meta.env.VITE_ADMIN_USERNAME || "admin"
      const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || "password"


      if (username === validUsername && password === validPassword) {
        setTimeout(() => {
          setIsLoading(false)
          onLogin(true)
        }, 1000)
      } else {
        setTimeout(() => {
          setIsLoading(false)
          setError("Invalid username or password")
        }, 1000)
      }
    } catch (error) {
      setIsLoading(false)
      setError("Login failed. Please try again.")
    }
  }

  const styles = {
    loginContainer: {
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      boxSizing: "border-box",
    },
    loginCard: {
      background: "white",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "450px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#e91e63",
      margin: "0 0 8px 0",
      lineHeight: "1.2",
    },
    subtitle: {
      fontSize: "14px",
      color: "#9ca3af",
      margin: "0",
      fontWeight: "400",
    },
    form: {
      width: "100%",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      color: "#e91e63",
      marginBottom: "8px",
      fontWeight: "500",
    },
    inputContainer: {
      position: "relative",
      width: "100%",
    },
    input: {
      width: "100%",
      padding: "15px 15px 15px 45px",
      border: "2px solid #e91e63",
      borderRadius: "8px",
      fontSize: "14px",
      backgroundColor: "#e5e7eb",
      color: "#374151",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#be185d",
      backgroundColor: "#f3f4f6",
    },
    inputIcon: {
      position: "absolute",
      left: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#e91e63",
      fontSize: "16px",
      zIndex: 1,
    },
    button: {
      width: "100%",
      padding: "15px",
      backgroundColor: "#e91e63",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "10px",
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
    error: {
      color: "#dc2626",
      fontSize: "12px",
      marginTop: "5px",
      textAlign: "center",
    },
    loading: {
      display: "inline-block",
      width: "16px",
      height: "16px",
      border: "2px solid #ffffff",
      borderRadius: "50%",
      borderTopColor: "transparent",
      animation: "spin 1s ease-in-out infinite",
      marginRight: "8px",
    },
  }

  const [focusedInput, setFocusedInput] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(false)

  return (
    <>
      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={styles.header}>
            <h1 style={styles.title}>Admin Login</h1>
            <p style={styles.subtitle}>After login admin can manage every thing.</p>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <div style={styles.inputContainer}>
                <span style={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedInput("username")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Enter username"
                  style={{
                    ...styles.input,
                    ...(focusedInput === "username" ? styles.inputFocus : {}),
                  }}
                  required
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputContainer}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="••••••••••••"
                  style={{
                    ...styles.input,
                    ...(focusedInput === "password" ? styles.inputFocus : {}),
                  }}
                  required
                />
              </div>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
              style={{
                ...styles.button,
                ...(hoveredButton && !isLoading ? styles.buttonHover : {}),
                ...(isLoading ? styles.buttonDisabled : {}),
              }}
            >
              {isLoading && <span style={styles.loading}></span>}
              {isLoading ? "Logging in..." : "Login Now"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
