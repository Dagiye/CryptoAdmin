import React, { useState } from "react";
import { X, Upload, Plus } from "lucide-react";

const ManageCoins = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list', 'add', 'edit'
  const [editingCoin, setEditingCoin] = useState(null);
  const [coins, setCoins] = useState([
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      profitLoss: "26%",
      status: "active",
      icon: "₿",
      iconColor: "#f7931a",
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      profitLoss: "15%",
      status: "active",
      icon: "♦",
      iconColor: "#627eea",
    },
    {
      id: 3,
      name: "BNB",
      symbol: "BNB",
      profitLoss: "10%",
      status: "active",
      icon: "◆",
      iconColor: "#f3ba2f",
    },
    {
      id: 4,
      name: "Bitcoin Cash",
      symbol: "BCH",
      profitLoss: "10%",
      status: "active",
      icon: "₿",
      iconColor: "#8dc351",
    },
    {
      id: 5,
      name: "BNX",
      symbol: "BNX",
      profitLoss: "10%",
      status: "active",
      icon: "●",
      iconColor: "#ff4757",
    },
    {
      id: 6,
      name: "Moniro",
      symbol: "XMR",
      profitLoss: "10%",
      status: "active",
      icon: "Ⓜ",
      iconColor: "#ff6600",
    },
    {
      id: 7,
      name: "AAVE",
      symbol: "AAVE",
      profitLoss: "10%",
      status: "active",
      icon: "Ⓐ",
      iconColor: "#2ebac6",
    },
    {
      id: 8,
      name: "Solana",
      symbol: "SOL",
      profitLoss: "10%",
      status: "active",
      icon: "◉",
      iconColor: "#9945ff",
    },
  ]);

  const [newCoin, setNewCoin] = useState({
    name: "",
    symbol: "",
    profitLoss: "",
    status: "active",
    icon: "",
    iconColor: "#e53e3e",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    symbol: "",
    profitLoss: "",
    status: "active",
    icon: "",
    iconColor: "#e53e3e",
  });

  const handleAddCoin = () => {
    setCurrentView("add");
  };

  const handleEdit = (coin) => {
    setEditingCoin(coin);
    setEditForm({
      name: coin.name,
      symbol: coin.symbol,
      profitLoss: coin.profitLoss.replace("%", ""),
      status: coin.status,
      icon: coin.icon,
      iconColor: coin.iconColor,
    });
    setCurrentView("edit");
  };

  const handleCloseModal = () => {
    setCurrentView("list");
    setEditingCoin(null);
    setNewCoin({
      name: "",
      symbol: "",
      profitLoss: "",
      status: "active",
      icon: "",
      iconColor: "#e53e3e",
    });
    setEditForm({
      name: "",
      symbol: "",
      profitLoss: "",
      status: "active",
      icon: "",
      iconColor: "#e53e3e",
    });
  };

  const handleSaveNewCoin = () => {
    if (newCoin.name && newCoin.symbol && newCoin.profitLoss) {
      const coin = {
        id: coins.length + 1,
        name: newCoin.name,
        symbol: newCoin.symbol,
        profitLoss: newCoin.profitLoss + "%",
        status: newCoin.status,
        icon: newCoin.icon || "●",
        iconColor: newCoin.iconColor,
      };
      setCoins([...coins, coin]);
      handleCloseModal();
      alert("Coin added successfully!");
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleUpdateCoin = () => {
    if (editForm.name && editForm.symbol && editForm.profitLoss) {
      setCoins((prev) =>
        prev.map((coin) =>
          coin.id === editingCoin.id
            ? {
                ...coin,
                name: editForm.name,
                symbol: editForm.symbol,
                profitLoss: editForm.profitLoss + "%",
                status: editForm.status,
                icon: editForm.icon,
                iconColor: editForm.iconColor,
              }
            : coin
        )
      );
      handleCloseModal();
      alert("Coin updated successfully!");
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleNewCoinInputChange = (field, value) => {
    setNewCoin((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStatusToggle = (id) => {
    setCoins((prev) =>
      prev.map((coin) =>
        coin.id === id
          ? {
              ...coin,
              status: coin.status === "active" ? "inactive" : "active",
            }
          : coin
      )
    );
  };

  // Add Coin Modal
  if (currentView === "add") {
    return (
      <>
        {/* Backdrop */}
        <div className="coin-modal-backdrop" onClick={handleCloseModal}></div>

        {/* Modal */}
        <div className="coin-modal">
          <div className="coin-modal-header">
            <h2 className="coin-modal-title">Add Coin</h2>
            <button className="coin-modal-close" onClick={handleCloseModal}>
              <X size={20} />
            </button>
          </div>

          <div className="coin-modal-content">
            <div className="coin-form-group">
              <div className="coin-icon-display">
                <span
                  className="coin-icon-preview"
                  style={{ color: newCoin.iconColor }}
                >
                  {newCoin.icon || "●"}
                </span>
              </div>
              <input
                type="text"
                value={newCoin.name}
                onChange={(e) =>
                  handleNewCoinInputChange("name", e.target.value)
                }
                className="coin-form-input"
                placeholder="Enter Coin Name"
              />
            </div>

            <div className="coin-form-group">
              <div className="coin-icon-display">
                <span className="coin-icon-symbol">◊</span>
              </div>
              <input
                type="text"
                value={newCoin.symbol}
                onChange={(e) =>
                  handleNewCoinInputChange("symbol", e.target.value)
                }
                className="coin-form-input"
                placeholder="Enter Coin Symbol"
              />
            </div>

            <div className="coin-form-group">
              <div className="coin-icon-display">
                <span className="coin-icon-percent">%</span>
              </div>
              <input
                type="number"
                value={newCoin.profitLoss}
                onChange={(e) =>
                  handleNewCoinInputChange("profitLoss", e.target.value)
                }
                className="coin-form-input"
                placeholder="Enter profit/loss in (%)"
              />
            </div>

            <div className="coin-image-section">
              <p className="coin-image-label">Image preview:</p>
              <div className="coin-image-preview">
                <div
                  className="coin-preview-circle"
                  style={{ backgroundColor: newCoin.iconColor }}
                >
                  <span className="coin-preview-icon">
                    {newCoin.icon || "●"}
                  </span>
                </div>
              </div>

              <div className="coin-file-upload">
                <input
                  type="file"
                  id="newCoinImage"
                  className="coin-file-input"
                  accept="image/*"
                />
                <label htmlFor="newCoinImage" className="coin-file-label">
                  <Upload size={16} />
                  Choose File
                  <span className="coin-file-text">No file chosen</span>
                </label>
                <p className="coin-file-info">
                  SVG, PNG, JPG or GIF (MAX. 200x200px)
                </p>
              </div>
            </div>

            <div className="coin-modal-actions">
              <button className="coin-update-btn" onClick={handleSaveNewCoin}>
                Add Coin
              </button>
              <button className="coin-cancel-btn" onClick={handleCloseModal}>
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Edit Modal
  if (currentView === "edit") {
    return (
      <>
        {/* Backdrop */}
        <div className="coin-modal-backdrop" onClick={handleCloseModal}></div>

        {/* Modal */}
        <div className="coin-modal">
          <div className="coin-modal-header">
            <h2 className="coin-modal-title">Update Coin</h2>
            <button className="coin-modal-close" onClick={handleCloseModal}>
              <X size={20} />
            </button>
          </div>

          <div className="coin-modal-content">
            <div className="coin-form-group">
              <div className="coin-icon-display">
                <span
                  className="coin-icon-preview"
                  style={{ color: editForm.iconColor }}
                >
                  {editForm.icon || "●"}
                </span>
              </div>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => handleEditInputChange("name", e.target.value)}
                className="coin-form-input"
                placeholder="Coin Name"
              />
            </div>

            <div className="coin-form-group">
              <div className="coin-icon-display">
                <span className="coin-icon-symbol">◊</span>
              </div>
              <input
                type="text"
                value={editForm.symbol}
                onChange={(e) =>
                  handleEditInputChange("symbol", e.target.value)
                }
                className="coin-form-input"
                placeholder="Symbol"
              />
            </div>

            <div className="coin-form-group">
              <div className="coin-icon-display">
                <span className="coin-icon-percent">%</span>
              </div>
              <input
                type="number"
                value={editForm.profitLoss}
                onChange={(e) =>
                  handleEditInputChange("profitLoss", e.target.value)
                }
                className="coin-form-input"
                placeholder="Profit/Loss %"
              />
            </div>

            <div className="coin-image-section">
              <p className="coin-image-label">Image preview:</p>
              <div className="coin-image-preview">
                <div
                  className="coin-preview-circle"
                  style={{ backgroundColor: editForm.iconColor }}
                >
                  <span className="coin-preview-icon">
                    {editForm.icon || "●"}
                  </span>
                </div>
              </div>

              <div className="coin-file-upload">
                <input
                  type="file"
                  id="coinImage"
                  className="coin-file-input"
                  accept="image/*"
                />
                <label htmlFor="coinImage" className="coin-file-label">
                  <Upload size={16} />
                  Choose File
                  <span className="coin-file-text">No file chosen</span>
                </label>
                <p className="coin-file-info">
                  SVG, PNG, JPG or GIF (MAX. 200x200px)
                </p>
              </div>
            </div>

            <div className="coin-modal-actions">
              <button className="coin-update-btn" onClick={handleUpdateCoin}>
                Update Coin
              </button>
              <button className="coin-cancel-btn" onClick={handleCloseModal}>
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Main List View
  return (
    <div className="manage-coins">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">Manage All Coins</h1>
          </div>
        </div>
      </div>

      {/* Coins Header Box */}
      <div className="coins-header">
        <div className="coins-header-left">
          <div className="coins-icon">💰</div>
          <h2 className="coins-header-title">Manage All Coins</h2>
        </div>
        <button className="add-coin-button" onClick={handleAddCoin}>
          <Plus size={16} />
        </button>
      </div>

      {/* Coins Table */}
      <div className="coins-table-container">
        <table className="coins-table">
          <thead>
            <tr>
              <th>SL.</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Profit/Loss</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id}>
                <td className="coin-sl">{index + 1}</td>
                <td className="coin-name">
                  <div className="coin-name-wrapper">
                    <div
                      className="coin-icon-circle"
                      style={{ backgroundColor: coin.iconColor }}
                    >
                      <span className="coin-icon">{coin.icon}</span>
                    </div>
                    <span className="coin-name-text">{coin.name}</span>
                  </div>
                </td>
                <td className="coin-symbol">{coin.symbol}</td>
                <td className="coin-profit">{coin.profitLoss}</td>
                <td>
                  <span
                    className={`coin-status-badge ${coin.status}`}
                    onClick={() => handleStatusToggle(coin.id)}
                  >
                    {coin.status}
                  </span>
                </td>
                <td>
                  <button
                    className="coin-edit-button"
                    onClick={() => handleEdit(coin)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoins;
