import React, { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import './App.css'
import { mockUsers } from "./data/mockUsers";
import TradeSettings from './components/TradeSettings'
import DepositMethods from './components/DepositMethods'
import WithdrawalMethods from './components/WithdrawalMethods'
import DepositLogs from './components/DepositLogs'
import UserTable from './components/UserTable'
import SearchBar from './components/SearchBar'
import Pagination from './components/Pagination'
import UserDetails from './components/UserDetails'
import VisitAccount from './components/VisitAccount'


// Import other components as needed, e.g.:
// import Dashboard from './components/Dashboard'
// import ManageBanners from './components/ManageBanners'
// etc.

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('dashboard') // default active

  // ADD THESE LINES:
  const [users, setUsers] = useState([]); // or your initial users array
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // or your preferred value
  const [currentView, setCurrentView] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);

  // Load mock users on mount
  React.useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  // Paginate users
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleViewDetails = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setCurrentView("userDetails");
  };

  const handleBackToUsers = () => {
    setCurrentView("list");
    setSelectedUser(null);
  };

  const handleVisitAccount = (user) => {
    setSelectedUser(user);
    setCurrentView("visitAccount");
  };

  // Handle user updates from UserDetails component
  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(updatedUser);
  };

  // Reset view when switching menu items
  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    setCurrentView("list");
    setSelectedUser(null);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };


  // Render content based on activeItem
  const renderContent = () => {
    switch (activeItem) {
      case 'trade-setting':
        return <TradeSettings />
      case 'deposit-methods':
          return <DepositMethods />
      case 'withdraw-methods':
          return <WithdrawalMethods />
      case 'deposit-logs':
          return <DepositLogs/>
      
      case "manage-users":
            if (currentView === "userDetails") {
              return (
                <UserDetails
                  user={selectedUser}
                  onBack={handleBackToUsers}
                  onUserUpdate={handleUserUpdate}
                  onVisitAccount={handleVisitAccount}
                />
              );
            } else if (currentView === "visitAccount") {
              return (
                <VisitAccount
                  user={selectedUser}
                  onBack={() => setCurrentView("userDetails")}
                />
              );
            } else {
              return (
                <div className="manage-users">
                  {/* Page Header */}
                  <div className="page-header">
                    <div className="page-header-content">
                      <div>
                        <h1 className="page-title">All Users</h1>
                        <p className="page-subtitle">Manage All Users from Here</p>
                      </div>
                      <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search Username or Email"
                      />
                    </div>
                  </div>
    
                  {/* User Table */}
                  <UserTable
                    users={paginatedUsers}
                    onViewDetails={handleViewDetails}
                  />
    
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
    
                  {/* Results info */}
                  <div className="results-info">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(startIndex + usersPerPage, filteredUsers.length)} of{" "}
                    {filteredUsers.length} users
                  </div>
                </div>
              );
            }
      // Add cases for other sidebar items:
      // case 'dashboard':
      //   return <Dashboard />
      // case 'manage-banners':
      //   return <ManageBanners />
      // ...etc...
      default:
        return (
          <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
            <h2>{activeItem.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
            <p>This section is under development.</p>
          </div>
        )
    }
  }

  return (
    <div className="app">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="app-content">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activeItem}
          onItemClick={setActiveItem}
        />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App