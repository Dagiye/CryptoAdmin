import React, { useState, useMemo, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import './App.css'

import TradeSettings from './components/TradeSettings'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import CheckInSettings from './components/CheckInSettings'
import EmailSettings from './components/EmailSettings'
import NoticeSetup from './components/NoticeSetup'
import AboutUsSetup from './components/AboutUsSetup'
import ContactDetails from './components/ContactDetails'
import UserTable from './components/UserTable'
import UserDetails from './components/UserDetails'
import ManageBanners from './components/ManageBanners'
import ProfileSettings from './components/ProfileSettings'
import WithdrawalMethods from './components/WithdrawalMethods'
import DepositMethods from './components/DepositMethods'
import DepositLogs from './components/DepositLogs'
import Transactions from './components/Transactions'
import TransferLogs from './components/TransferLogs'
import WithdrawLogs from './components/WithdrawLogs'
import{ mockUsers } from './data/mockUsers' // Import mock users if needed

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
  useEffect(() => {
    setUsers(mockUsers)
  }, [])

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
  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveItem('dashboard'); // <-- Reset to default page
  }

  // Render content based on activeItem
  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard />
      case 'trade-setting':
        return <TradeSettings />
       case 'checkin-settings':
          return <CheckInSettings />
      case 'email-settings':
          return <EmailSettings />
      case 'notice-setup':
          return <NoticeSetup />
      case 'about-us-setup':
          return <AboutUsSetup />
      case 'contact-details-setup':
          return <ContactDetails />
      case 'manage-users':
        return (
          <UserTable
            users={paginatedUsers}
            onViewDetails={handleViewDetails}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )
      case 'user-details':
        return (
          <UserDetails
            user={selectedUser}
            onBack={handleBackToUsers}
            onUserUpdate={handleUserUpdate}
            onVisitAccount={handleVisitAccount}
          />
        )
      // Uncomment and add other cases as needed:
      case 'manage-banners':
        return <ManageBanners />
      case 'profile-settings':
        return <ProfileSettings />
      case 'withdraw-methods':
        return <WithdrawalMethods />
      case 'deposit-methods':
        return <DepositMethods />
      case 'deposit-logs':
        return <DepositLogs/>
      case 'transactions':
        return<Transactions/>
      case 'transfer-logs':
        return <TransferLogs />
      case 'withdraw-logs':
        return <WithdrawLogs />
      case 'logout':
        handleLogout();
        return null;
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
