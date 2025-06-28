"use client"

import { useState, useEffect } from "react"
import Login from "./components/Login"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import ManageBanners from "./components/ManageBanners"

import "./App.css"
import TradeSettings from "./components/TradeSettings"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("dashboard")

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated")
    if (savedAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (authStatus) => {
    setIsAuthenticated(authStatus)
    if (authStatus) {
      localStorage.setItem("isAuthenticated", "true")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
    setActiveItem("dashboard") // Reset to dashboard on logout
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Render content based on activeItem
  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <Dashboard />
      case "trade-setting":
        return <TradeSettings />
      case "manage-banners":
        return <ManageBanners />
      // Add cases for other sidebar items:
      // case 'manage-banners':
      //   return <ManageBanners />
      // ...etc...
      default:
        return (
          <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
            <h2>{activeItem.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</h2>
            <p>This section is under development.</p>
          </div>
        )
    }
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  // Show main dashboard if authenticated
  return (
    <div className="app">
      <Header onToggleSidebar={toggleSidebar} onLogout={handleLogout} />
      <div className="app-content">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activeItem}
          onItemClick={setActiveItem}
        />
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  )
}

export default App
