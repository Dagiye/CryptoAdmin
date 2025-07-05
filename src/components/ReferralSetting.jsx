import React, { useState } from "react";

const ReferralSetting = () => {
  const [depositLevels, setDepositLevels] = useState("3");
  const [tradeLevels, setTradeLevels] = useState("3");

  const [depositLevel1, setDepositLevel1] = useState("");
  const [depositLevel2, setDepositLevel2] = useState("");
  const [depositLevel3, setDepositLevel3] = useState("");

  const [tradeLevel1, setTradeLevel1] = useState("");
  const [tradeLevel2, setTradeLevel2] = useState("");
  const [tradeLevel3, setTradeLevel3] = useState("");

  const handleUpdateInformation = () => {
    alert("Referral settings updated successfully!");
  };

  return (
    <div className="referral-setting">
      <div className="page-header">
        <h1 className="page-title">Referral Setting</h1>
        <p className="page-subtitle">Manage Referral Settings from Here</p>
      </div>

      <div className="referral-settings-section">
        {/* Deposit Referral Bonus Section */}
        <div className="referral-bonus-section">
          <div className="bonus-header">
            <h2 className="bonus-title">Deposit Referral Bonus (%)</h2>
            <select
              className="level-select"
              value={depositLevels}
              onChange={(e) => setDepositLevels(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
          </div>

          <div className="levels-grid">
            <div className="level-group">
              <label className="level-label">Level 1 (%)</label>
              <div className="level-input-wrapper">
                <span className="input-symbol">%</span>
                <input
                  type="text"
                  value={depositLevel1}
                  onChange={(e) => setDepositLevel1(e.target.value)}
                  className="level-input"
                  placeholder="Enter Deposit Referral Bonus"
                />
              </div>
            </div>

            <div className="level-group">
              <label className="level-label">Level 2 (%)</label>
              <div className="level-input-wrapper">
                <span className="input-symbol">%</span>
                <input
                  type="text"
                  value={depositLevel2}
                  onChange={(e) => setDepositLevel2(e.target.value)}
                  className="level-input"
                  placeholder="Enter Deposit Referral Bonus"
                />
              </div>
            </div>

            <div className="level-group">
              <label className="level-label">Level 3 (%)</label>
              <div className="level-input-wrapper">
                <span className="input-symbol">%</span>
                <input
                  type="text"
                  value={depositLevel3}
                  onChange={(e) => setDepositLevel3(e.target.value)}
                  className="level-input"
                  placeholder="Enter Deposit Referral Bonus"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trade Win Referral Bonus Section */}
        <div className="referral-bonus-section">
          <div className="bonus-header">
            <h2 className="bonus-title">Trade Win Referral Bonus (%)</h2>
            <select
              className="level-select"
              value={tradeLevels}
              onChange={(e) => setTradeLevels(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
          </div>

          <div className="levels-grid">
            <div className="level-group">
              <label className="level-label">Level 1 (%)</label>
              <div className="level-input-wrapper">
                <span className="input-symbol">%</span>
                <input
                  type="text"
                  value={tradeLevel1}
                  onChange={(e) => setTradeLevel1(e.target.value)}
                  className="level-input"
                  placeholder="Enter Deposit Referral Bonus"
                />
              </div>
            </div>

            <div className="level-group">
              <label className="level-label">Level 2 (%)</label>
              <div className="level-input-wrapper">
                <span className="input-symbol">%</span>
                <input
                  type="text"
                  value={tradeLevel2}
                  onChange={(e) => setTradeLevel2(e.target.value)}
                  className="level-input"
                  placeholder="Enter Deposit Referral Bonus"
                />
              </div>
            </div>

            <div className="level-group">
              <label className="level-label">Level 3 (%)</label>
              <div className="level-input-wrapper">
                <span className="input-symbol">%</span>
                <input
                  type="text"
                  value={tradeLevel3}
                  onChange={(e) => setTradeLevel3(e.target.value)}
                  className="level-input"
                  placeholder="Enter Deposit Referral Bonus"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button
          className="update-information-button"
          onClick={handleUpdateInformation}
        >
          Update Information
        </button>
      </div>
    </div>
  );
};

export default ReferralSetting;
