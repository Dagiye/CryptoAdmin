import React, { useState } from 'react';

const NoticeSetup = () => {
  const [noticeText, setNoticeText] = useState("TRUSTED CRYPTO");
  const [success, setSuccess] = useState(false);

  const handleUpdateNotice = (e) => {
    e.preventDefault();
    if (noticeText.trim()) {
      console.log('Notice updated:', noticeText);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      alert('Please enter a notice text');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Notice Setup</h1>
      <p style={styles.subtitle}>Manage Scrolling Notice from Here</p>
      
      <form onSubmit={handleUpdateNotice} style={styles.form}>
        <div style={styles.formField}>
          <label htmlFor="notice-text" style={styles.label}>Scrolling Notice</label>
          <input
            type="text"
            id="notice-text"
            style={styles.input}
            placeholder="Enter your notice text"
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Update Notice</button>
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
    width: "100%",
    boxSizing: "border-box",
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
    gridTemplateColumns: "1fr",
    gap: "20px 30px",
  },
  formField: {
    display: "flex",
    flexDirection: "column",
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
    boxSizing: "border-box",
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

export default NoticeSetup;