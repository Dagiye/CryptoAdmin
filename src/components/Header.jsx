"use client"

const Header = ({ onToggleSidebar, onProfileClick }) => {
  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick()
    }
  }

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
          <div className="profile-avatar" style={{ fontSize: 24, cursor: "pointer" }} onClick={handleProfileClick}>
            👤
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header