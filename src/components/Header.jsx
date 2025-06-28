import React from 'react'

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="hamburger-btn" onClick={onToggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="logo">
            <div className="logo-icon">TC</div>
            <span className="logo-text">Trusted Crypto</span>
          </div>
        </div>
        <div className="header-right">
          <div className="profile-avatar" style={{ fontSize: 24 }}>
            👤
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header