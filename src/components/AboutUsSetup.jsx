import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AboutUsSetup = () => {
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      alert("Please enter content before submitting.");
      return;
    }

    // Simulate API call
    console.log("Submitted About Us content:", content);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="settings-section" style={styles.container}>
      <style>
        {`
          .ql-editor {
            border: none !important;
            outline: none !important;
          }
          .ql-toolbar {
            border: none !important;
            border-bottom: 1px solid #e53e3e !important;
            border-radius: 8px 8px 0 0 !important;
          }
          .ql-container {
            border: none !important;
            border-radius: 0 0 8px 8px !important;
          }
        `}
      </style>
      
      <div className="page-header">
        <h1 className="page-title" style={styles.title}>About Us</h1>
        <p className="page-subtitle" style={styles.subtitle}>Manage All About Us from Here</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.cardTitle}>About Us Setup</h2>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          style={styles.editor}
        />

        <button type="submit" style={styles.button}>
          Update About Us
        </button>

        {success && (
          <p style={styles.successMessage}>✅ About Us updated successfully!</p>
        )}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    color: "#d80d43",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#888",
    marginBottom: "20px",
    fontWeight: 500,
  },
  card: {
    background: "#ffe6eb",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(194, 14, 63, 0.1)",
  },
  cardTitle: {
    color: "#d80d43",
    marginBottom: "10px",
  },
  editor: {
    height: "200px",
    marginBottom: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid #e53e3e",
  },
  button: {
    backgroundColor: "#d80d43",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    outline: "none",
    boxShadow: "0 2px 4px rgba(216, 13, 67, 0.2)",
  },
  successMessage: {
    marginTop: "15px",
    color: "#0f9d58",
    fontWeight: "600",
  },
};

export default AboutUsSetup; 