import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import './App.css'
import TradeSettings from './components/TradeSettings'
import DepositLogs from './components/DepositLogs';
import Transactions from './components/Transactions';
import TransferLogs from './components/TransferLogs';
import WithdrawLogs from './components/WithdrawLogs'
// ...existing code...
// Import other components as needed, e.g.:
// import Dashboard from './components/Dashboard'
// import ManageBanners from './components/ManageBanners'
// etc.

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard'); // default active

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Render content based on activeItem
  const renderContent = () => {
    switch (activeItem) {
      case 'trade-setting':
        return <TradeSettings />
        case 'deposit-logs':
      return <DepositLogs />
      case 'transactions':
        return <Transactions />
      case 'transfer-logs':
        return <TransferLogs />
      case 'withdraw-logs':
        return <WithdrawLogs />
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