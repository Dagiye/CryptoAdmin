import React, { useState, useEffect } from 'react';
import './SiteSettings.css';

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    siteTitle: 'Trusted Crypto',
    siteCurrency: 'USDT',
    currencySymbol: '$',
    signupBonus: '0',
    transferMinLimit: '10',
    transferCharge: '3',
    cryptoApiKey: '826683e8-2df9-4ef2-8f38-91b8480faf8e',
    imageApiKey: '9c3774fbfb79146b5a3a78cafdba45c4',
    emailVerification: 'OFF',
    kycVerification: 'ON'
  });

  useEffect(() => {
    // Empty for demo - in production, replace with API call to your Node.js backend
    // Example: fetchSiteSettings();
  }, []);

  // Function to fetch site settings from Node.js backend
  const fetchSiteSettings = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/site-settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching site settings:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      
      if (response.ok) {
        console.log('Settings updated successfully');
        // Add success notification here
      }
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div className="site-settings-container">
      <div className="site-settings-header">
        <div className="header-content">
          <h1 className="page-title">Settings</h1>
          
        </div>
      </div>
<p className="page-subtitle">Manage All Settings from Here</p>
      <div className="site-settings-card">
        <form onSubmit={handleSubmit}>
          {/* Site Setting Section */}
          <div className="settings-section">
            <h2 className="section-title">Site Setting</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Site Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.siteTitle}
                  onChange={(e) => handleInputChange('siteTitle', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Site Currency</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.siteCurrency}
                  onChange={(e) => handleInputChange('siteCurrency', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Currency Symbol</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.currencySymbol}
                  onChange={(e) => handleInputChange('currencySymbol', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Signup Bonus in (USDT)</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.signupBonus}
                  onChange={(e) => handleInputChange('signupBonus', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Transfer Min Limit in (USDT)</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.transferMinLimit}
                  onChange={(e) => handleInputChange('transferMinLimit', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Transfer Charge in (%)</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.transferCharge}
                  onChange={(e) => handleInputChange('transferCharge', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Crypto Api Key</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.cryptoApiKey}
                  onChange={(e) => handleInputChange('cryptoApiKey', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Image Api Key</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.imageApiKey}
                  onChange={(e) => handleInputChange('imageApiKey', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Basic Setting Section */}
          <div className="settings-section">
            <h2 className="section-title">Basic Setting</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Verification</label>
                <select
                  className="form-select"
                  value={settings.emailVerification}
                  onChange={(e) => handleInputChange('emailVerification', e.target.value)}
                >
                  <option value="OFF">OFF</option>
                  <option value="ON">ON</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">KYC Verification</label>
                <select
                  className="form-select"
                  value={settings.kycVerification}
                  onChange={(e) => handleInputChange('kycVerification', e.target.value)}
                >
                  <option value="OFF">OFF</option>
                  <option value="ON">ON</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Update Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SiteSettings;