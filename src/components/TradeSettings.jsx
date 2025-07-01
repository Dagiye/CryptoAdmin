import React from 'react'

const TradeSettings = () => {
  return (
    <div className="trade-settings">
      <div className="page-header">
        <h1 className="page-title">Trade Setting</h1>
        <p className="page-subtitle">Setup your Trade Setting</p>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Manual Trade</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label>Minimum Trade Open (USDT)</label>
            <input type="number" defaultValue="50" className="form-input" />
          </div>
          <div className="form-group">
            <label>Maximum Trade Open (USDT)</label>
            <input type="number" defaultValue="1000000" className="form-input" />
          </div>
        </div>

        <div className="form-row single">
          <div className="form-group">
            <label>Daily Trade Limit (Times)</label>
            <input type="number" defaultValue="5" className="form-input" />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Manual Trading Setting</h2>
        
        <div className="trading-options">
          <div className="trading-option">
            <label>60 Seconds Trade</label>
            <select className="form-select">
              <option value="loss">Loss</option>
              <option value="win">Win</option>
            </select>
          </div>
          <div className="trading-option">
            <label>3 Minutes Trade</label>
            <select className="form-select">
              <option value="loss">Loss</option>
              <option value="win">Win</option>
            </select>
          </div>
          <div className="trading-option">
            <label>5 Minutes Trade</label>
            <select className="form-select">
              <option value="loss">Loss</option>
              <option value="win">Win</option>
            </select>
          </div>
          <div className="trading-option">
            <label>30 Seconds Trade</label>
            <select className="form-select">
              <option value="loss">Loss</option>
              <option value="win">Win</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Bot Trade Setup</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label>Profit Type</label>
            <select className="form-select">
              <option value="profit">Profit (+)</option>
              <option value="loss">Loss (-)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Minimum Trade Start (USDT)</label>
            <input type="number" defaultValue="50" className="form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Maximum Trade Start (USDT)</label>
            <input type="number" defaultValue="100000" className="form-input" />
          </div>
          <div className="form-group">
            <label>Daily Trade Limit (Times)</label>
            <input type="number" defaultValue="999" className="form-input" />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Bot Trade Time & Profit Setup</h2>
        
        <div className="time-profit-grid">
          <div className="time-profit-row">
            <div className="time-profit-pair">
              <div className="form-group">
                <label>Time (Hour)</label>
                <input type="number" defaultValue="5" className="form-input" />
              </div>
              <div className="arrow-icon">➤</div>
              <div className="form-group">
                <label>Profit (%)</label>
                <input type="number" defaultValue="1" className="form-input" />
              </div>
            </div>
            <div className="time-profit-pair">
              <div className="form-group">
                <label>Time (Hour)</label>
                <input type="number" defaultValue="10" className="form-input" />
              </div>
              <div className="arrow-icon">➤</div>
              <div className="form-group">
                <label>Profit (%)</label>
                <input type="number" defaultValue="2" className="form-input" />
              </div>
            </div>
          </div>

          <div className="time-profit-row">
            <div className="time-profit-pair">
              <div className="form-group">
                <label>Time (Hour)</label>
                <input type="number" defaultValue="30" className="form-input" />
              </div>
              <div className="arrow-icon">➤</div>
              <div className="form-group">
                <label>Profit (%)</label>
                <input type="number" defaultValue="3" className="form-input" />
              </div>
            </div>
            <div className="time-profit-pair">
              <div className="form-group">
                <label>Time (Hour)</label>
                <input type="number" defaultValue="45" className="form-input" />
              </div>
              <div className="arrow-icon">➤</div>
              <div className="form-group">
                <label>Profit (%)</label>
                <input type="number" defaultValue="4" className="form-input" />
              </div>
            </div>
          </div>

          <div className="time-profit-row">
            <div className="time-profit-pair">
              <div className="form-group">
                <label>Time (Hour)</label>
                <input type="number" defaultValue="60" className="form-input" />
              </div>
              <div className="arrow-icon">➤</div>
              <div className="form-group">
                <label>Profit (%)</label>
                <input type="number" defaultValue="5" className="form-input" />
              </div>
            </div>
            <div className="time-profit-pair empty">
              {/* Empty space for alignment */}
            </div>
          </div>
        </div>
      </div>

      <div className="update-button-container">
        <button className="update-button">Update Setting</button>
      </div>
    </div>
  )
}

export default TradeSettings