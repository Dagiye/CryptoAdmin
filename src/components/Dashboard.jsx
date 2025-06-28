"use client"

import { useState } from "react"

const Dashboard = () => {
  const dashboardData = [
    {
      title: "Total Users",
      value: "24",
      icon: "👤",
      iconBg: "#FF6B35",
    },
    {
      title: "Total Transactions",
      value: "159",
      icon: "📊",
      iconBg: "#4A90E2",
    },
    {
      title: "Total Deposit",
      value: "$ 1934.00",
      icon: "💰",
      iconBg: "#7ED321",
    },
    {
      title: "Pending Deposit",
      value: "$ 0.00",
      icon: "🪙",
      iconBg: "#F5A623",
    },
    {
      title: "Total Withdraw",
      value: "$ 85.00",
      icon: "💳",
      iconBg: "#50E3C2",
    },
    {
      title: "Pending Withdraw",
      value: "$ 0.00",
      icon: "🤝",
      iconBg: "#B8E986",
    },
    {
      title: "Total Transfer",
      value: "$ 10.00",
      icon: "💸",
      iconBg: "#7ED321",
    },
    {
      title: "Today Transfer",
      value: "$ 0.00",
      icon: "🔄",
      iconBg: "#4A90E2",
    },
  ]

  const styles = {
    dashboard: {
      padding: "20px 30px",
      backgroundColor: "#fdf2f8",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    dashboardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
      gap: "20px",
      maxWidth: "100%",
      margin: "0",
    },
    dashboardCard: {
      background: "white",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(0, 0, 0, 0.05)",
      height: "100px",
      display: "flex",
      alignItems: "center",
    },
    cardContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    cardText: {
      flex: 1,
    },
    cardTitle: {
      fontSize: "14px",
      fontWeight: "400",
      color: "#e91e63",
      margin: "0 0 8px 0",
      lineHeight: "1.2",
    },
    cardValue: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#e91e63",
      margin: "0",
      lineHeight: "1",
    },
    cardIcon: {
      width: "50px",
      height: "50px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "15px",
      flexShrink: 0,
    },
    icon: {
      fontSize: "24px",
      filter: "brightness(0.9)",
    },
  }

  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div style={styles.dashboard}>
      <div style={styles.dashboardGrid}>
        {dashboardData.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.dashboardCard,
              transform: hoveredCard === index ? "translateY(-1px)" : "translateY(0)",
              boxShadow: hoveredCard === index ? "0 2px 8px rgba(0, 0, 0, 0.15)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.cardContent}>
              <div style={styles.cardText}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardValue}>{item.value}</p>
              </div>
              <div style={{ ...styles.cardIcon, backgroundColor: item.iconBg }}>
                <span style={styles.icon}>{item.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
