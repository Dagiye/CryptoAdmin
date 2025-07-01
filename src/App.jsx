import React, { useState, useMemo, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import './App.css'
import TradeSettings from './components/TradeSettings'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
// import ManageBanners from './components/ManageBanners'
// ...import other components as needed...

// If you have mock users, import them
// import mockUsers from './data/mockUsers'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('dashboard')
  const [users, setUsers] = useState([]) // or use mockUsers as initial value
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10
  const [currentView, setCurrentView] = useState('list')
  const [selectedUser, setSelectedUser] = useState(null)

  // Example: Load mock users on mount (if you have mockUsers)
  // useEffect(() => {
  //   setUsers(mockUsers)
  // }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, users])

  // Paginate users
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  )

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleViewDetails = (userId) => {
    const user = users.find((u) => u.id === userId)
    setSelectedUser(user)
    setCurrentView('userDetails')
  }

  const handleBackToUsers = () => {
    setCurrentView('list')
    setSelectedUser(null)
  }

  const handleVisitAccount = (user) => {
    setSelectedUser(user)
    setCurrentView('visitAccount')
  }

  // Handle user updates from UserDetails component
  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    )
    setSelectedUser(updatedUser)
  }

  // Reset view when switching menu items
  const handleItemClick = (itemId) => {
    setActiveItem(itemId)
    setCurrentView('list')
    setSelectedUser(null)
    setSidebarOpen(false)
  }

  // Dummy login/logout handlers
  const handleLogin = () => setIsAuthenticated(true)
  const handleLogout = () => setIsAuthenticated(false)

  // Render content based on activeItem
  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard />
      case 'trade-setting':
        return <TradeSettings />
      // Add cases for other sidebar items:
      // case 'manage-banners':
      //   return <ManageBanners />
      default:
        return (
          <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
            <h2>
              {activeItem
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </h2>
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
      <Header
        onToggleSidebar={toggleSidebar}
        onLogout={handleLogout}
        onProfileClick={() => setActiveItem('profile-settings')}
      />
      <div className="app-content">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  )
}

export default App
