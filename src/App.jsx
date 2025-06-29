import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import './App.css'

import TradeSettings from './components/TradeSettings'

// Import your components
import CheckInSettings from './components/CheckInSettings'
import EmailSettings from './components/EmailSettings'
import NoticeSetup from './components/NoticeSetup'
import AboutUsSetup from './components/AboutUsSetup'
import ContactDetails from './components/ContactDetails'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('dashboard') // default active

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Render content based on sidebar selection
  const renderContent = () => {
    switch (activeItem) {
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
