// src/pages/EmailSettings.jsx

import React, { useState } from 'react';

const EmailSettings = () => {
  const [emailConfig, setEmailConfig] = useState({
    fromName: '',
    fromEmail: '',
    username: '',
    password: '',
    smtpHost: '',
    smtpPort: ''
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmailConfig({ ...emailConfig, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailConfig); // Replace with API call later
    
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Email Setup</h1>
      <p style={styles.subtitle}>Setup Email Configuration</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label htmlFor="fromName" style={styles.label}>Email From Name</label>
          <input
            type="text"
            id="fromName"
            name="fromName"
            value={emailConfig.fromName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label htmlFor="fromEmail" style={styles.label}>Email From Address</label>
          <input
            type="email"
            id="fromEmail"
            name="fromEmail"
            value={emailConfig.fromEmail}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label htmlFor="username" style={styles.label}>Email Username</label>
          <input
            type="email"
            id="username"
            name="username"
            value={emailConfig.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label htmlFor="password" style={styles.label}>Email Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={emailConfig.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label htmlFor="smtpHost" style={styles.label}>SMTP Host</label>
          <input
            type="text"
            id="smtpHost"
            name="smtpHost"
            value={emailConfig.smtpHost}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label htmlFor="smtpPort" style={styles.label}>SMTP Port</label>
          <input
            type="number"
            id="smtpPort"
            name="smtpPort"
            value={emailConfig.smtpPort}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Update Setting</button>
      </form>

      {/* ✅ Confirmation message */}
      {success && (
        <p style={styles.successMessage}>✅ Successfully updated!</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    background: "#ffffff",
    padding: "20px 30px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(194, 14, 63, 0.1)",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#c20e3f",
  },
  title: {
    color: "#d80d43",
    fontWeight: 600,
    marginBottom: "5px",
    fontSize: "18px",
  },
  subtitle: {
    color: "#b3b3b3",
    fontWeight: 600,
    marginTop: 0,
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px 30px",
  },
  label: {
    display: "block",
    fontWeight: 600,
    marginBottom: "6px",
    fontSize: "0.9rem",
    color: "#d80d43",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: "1rem",
    border: "2px solid #d80d43",
    borderRadius: "8px",
    outlineOffset: "2px",
    transition: "border-color 0.3s ease",
    backgroundColor: "#ffffff", 
    color: "#000000", 
  },
  button: {
    gridColumn: "1 / -1",
    backgroundColor: "#d80d43",
    color: "white",
    border: "none",
    padding: "14px 0",
    fontSize: "1.1rem",
    fontWeight: 600,
    borderRadius: "12px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
  successMessage: {
    marginTop: "20px",
    color: "#0f9d58",
    fontWeight: "600",
    fontSize: "1rem",
  },
};

export default EmailSettings;
