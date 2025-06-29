import React, { useState } from "react";

const CheckInSettings = () => {
  const [bonuses, setBonuses] = useState({
    saturday: 0.1,
    sunday: 0.2,
    monday: 0.3,
    tuesday: 0.4,
    wednesday: 0.5,
    thursday: 0.6,
    friday: 0.7,
  });

  const [success, setSuccess] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBonuses((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedBonuses = Object.fromEntries(
      Object.entries(bonuses).map(([day, val]) => [day, parseFloat(val)])
    );

    for (const val of Object.values(parsedBonuses)) {
      if (isNaN(val) || val < 0) {
        alert("Please enter valid non-negative numbers.");
        return;
      }
    }

    // Replace this with real API call
    console.log("Saving bonuses:", parsedBonuses);

    
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="settings-section" style={styles.container}>
      <div className="page-header">
        <h1 className="page-title" style={styles.title}>Check In Setup</h1>
        <p className="page-subtitle" style={styles.subtitle}>Setup Daily Check In System</p>
      </div>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {Object.entries(bonuses).map(([day, val]) => (
          <div key={day}>
            <label htmlFor={day} style={styles.label}>
              {day.charAt(0).toUpperCase() + day.slice(1)} Bonus in (USDT)
            </label>
            <input
              type="number"
              id={day}
              name={day}
              value={val}
              step="0.01"
              min="0"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        ))}
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

export default CheckInSettings; 