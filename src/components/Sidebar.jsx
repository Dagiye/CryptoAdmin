import React from 'react';

const Sidebar = ({ isOpen, onClose, activeItem, onItemClick }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'manage-banners', label: 'Manage Banners', icon: '🏷️' },
    { id: 'manage-users', label: 'Manage Users', icon: '👥' },
    { id: 'pending-kyc', label: 'Pending Kyc Data', icon: '📋' },
    { id: 'referral-setting', label: 'Referral Setting', icon: '🎯' },
    { id: 'manage-coins', label: 'Manage Coins', icon: '💰' },
    { id: 'trade-setting', label: 'Trade Setting', icon: '📈' }
  ];

  const gatewayItems = [
    { id: 'deposit-methods', label: 'Deposit Methods', icon: '💳' },
    { id: 'withdraw-methods', label: 'Withdraw Methods', icon: '💸' }
  ];

  const logItems = [
    { id: 'deposit-logs', label: 'Deposit Logs', icon: '📝' },
    { id: 'withdraw-logs', label: 'Withdraw Logs', icon: '📄' },
    { id: 'transactions', label: 'Transactions', icon: '🔄' },
    { id: 'transfer-logs', label: 'Transfer Logs', icon: '🔁' }
  ];

  const settingsItems = [
    { id: 'site-settings', label: 'Site Settings', icon: '⚙️' },
    { id: 'checkin-settings', label: 'Check-In Settings', icon: '✅' },
    { id: 'email-settings', label: 'Email Settings', icon: '✉️' },
    { id: 'notice-setup', label: 'Notice Setup', icon: '🔔' },
    { id: 'aboutus-setup', label: 'About Us Setup', icon: 'ℹ️' },
    { id: 'contact-details-setup', label: 'Contact Details Setup', icon: '📞' },
    { id: 'logout', label: 'Logout', icon: '🚪' }
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Menu</h3>
            <nav className="sidebar-nav">
              {menuItems.map(item => (
                <a
                  key={item.id}
                  href="#"
                  className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => onItemClick(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Gateways</h3>
            <nav className="sidebar-nav">
              {gatewayItems.map(item => (
                <a key={item.id} href="#" className="nav-item">
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Logs</h3>
            <nav className="sidebar-nav">
              {logItems.map(item => (
                <a key={item.id} href="#" className="nav-item">
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-title">Settings</h3>
            <nav className="sidebar-nav">
              {settingsItems.map(item => (
                <a key={item.id} href="#" className="nav-item">
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="sidebar-footer">
            <span className="version">Version 1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;