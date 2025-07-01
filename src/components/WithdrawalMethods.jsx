import React, { useState } from 'react'

const WithdrawalMethods = () => {
  const [currentView, setCurrentView] = useState('list') // 'list', 'add', 'edit'
  const [editingMethod, setEditingMethod] = useState(null)
  const [withdrawMethods, setWithdrawMethods] = useState([
    {
      id: 1,
      name: 'Bitcoin',
      currency: 'BTC',
      symbol: '$',
      charge: '0%',
      minLimit: 10,
      maxLimit: 1000000,
      status: 'active',
      exchangeRate: '?',
      informationFromUser: 'Your (TRC 20) Address'
    },
    {
      id: 2,
      name: 'ETH (Ethereum)',
      currency: 'Ethereum',
      symbol: '$',
      charge: '1%',
      minLimit: 0,
      maxLimit: 0,
      status: 'inactive',
      exchangeRate: '0.00044',
      informationFromUser: 'Your (TRC 20) Address'
    },
    {
      id: 3,
      name: 'USDT (TRC 20)',
      currency: 'USDT',
      symbol: '$',
      charge: '0%',
      minLimit: 10,
      maxLimit: 1000000,
      status: 'active',
      exchangeRate: '?',
      informationFromUser: 'Your (TRC 20) Address'
    }
  ])

  const [newMethod, setNewMethod] = useState({
    name: '',
    currency: '',
    symbol: '$',
    charge: '',
    minLimit: '',
    maxLimit: '',
    status: 'active',
    exchangeRate: '',
    informationFromUser: ''
  })

  const [editMethod, setEditMethod] = useState({
    name: '',
    currency: '',
    symbol: '$',
    charge: '',
    minLimit: '',
    maxLimit: '',
    status: 'active',
    exchangeRate: '',
    informationFromUser: ''
  })

  const handleAddMethod = () => {
    setCurrentView('add')
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setEditingMethod(null)
    // Reset forms
    setNewMethod({
      name: '',
      currency: '',
      symbol: '$',
      charge: '',
      minLimit: '',
      maxLimit: '',
      status: 'active',
      exchangeRate: '',
      informationFromUser: ''
    })
    setEditMethod({
      name: '',
      currency: '',
      symbol: '$',
      charge: '',
      minLimit: '',
      maxLimit: '',
      status: 'active',
      exchangeRate: '',
      informationFromUser: ''
    })
  }

  const handleSaveMethod = () => {
    if (newMethod.name && newMethod.currency && newMethod.minLimit && newMethod.maxLimit) {
      const method = {
        id: withdrawMethods.length + 1,
        ...newMethod,
        minLimit: Number(newMethod.minLimit),
        maxLimit: Number(newMethod.maxLimit)
      }
      setWithdrawMethods([...withdrawMethods, method])
      handleBackToList()
      alert('Withdraw method added successfully!')
    } else {
      alert('Please fill in all required fields')
    }
  }

  const handleInputChange = (field, value) => {
    setNewMethod(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEditInputChange = (field, value) => {
    setEditMethod(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEdit = (id) => {
    const methodToEdit = withdrawMethods.find(method => method.id === id)
    if (methodToEdit) {
      setEditingMethod(methodToEdit)
      setEditMethod({
        name: methodToEdit.name,
        currency: methodToEdit.currency,
        symbol: methodToEdit.symbol,
        charge: methodToEdit.charge,
        minLimit: methodToEdit.minLimit.toString(),
        maxLimit: methodToEdit.maxLimit.toString(),
        status: methodToEdit.status,
        exchangeRate: methodToEdit.exchangeRate,
        informationFromUser: methodToEdit.informationFromUser
      })
      setCurrentView('edit')
    }
  }

  const handleUpdateMethod = () => {
    if (editMethod.name && editMethod.currency && editMethod.minLimit && editMethod.maxLimit) {
      setWithdrawMethods(prev => 
        prev.map(method => 
          method.id === editingMethod.id 
            ? {
                ...method,
                name: editMethod.name,
                currency: editMethod.currency,
                symbol: editMethod.symbol,
                charge: editMethod.charge,
                minLimit: Number(editMethod.minLimit),
                maxLimit: Number(editMethod.maxLimit),
                status: editMethod.status,
                exchangeRate: editMethod.exchangeRate,
                informationFromUser: editMethod.informationFromUser
              }
            : method
        )
      )
      handleBackToList()
      alert('Withdraw method updated successfully!')
    } else {
      alert('Please fill in all required fields')
    }
  }

  const handleStatusToggle = (id) => {
    setWithdrawMethods(prev => 
      prev.map(method => 
        method.id === id 
          ? { ...method, status: method.status === 'active' ? 'inactive' : 'active' }
          : method
      )
    )
  }

  // Add Method Form
  if (currentView === 'add') {
    return (
      <div className="withdraw-methods">
        <div className="withdraw-header">
          <div className="withdraw-header-left">
            <div className="withdraw-icon">💸</div>
            <h1 className="withdraw-title">Add a Withdraw Method</h1>
          </div>
          <button className="back-button" onClick={handleBackToList}>
            <span className="back-icon">←</span>
            Back
          </button>
        </div>

        <div className="withdraw-form-container">
          <div className="withdraw-form-section">
            <div className="form-row">
              <div className="form-group">
                <label>Method Name *</label>
                <input 
                  type="text" 
                  value={newMethod.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="form-input"
                  placeholder="Ex: Binance"
                />
              </div>
              <div className="form-group">
                <label>Method Currency *</label>
                <input 
                  type="text" 
                  value={newMethod.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="form-input"
                  placeholder="Ex: USDT"
                />
              </div>
              <div className="form-group">
                <label>Method Symbol</label>
                <input 
                  type="text" 
                  value={newMethod.symbol}
                  onChange={(e) => handleInputChange('symbol', e.target.value)}
                  className="form-input"
                  placeholder="Ex: $"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>1 USDT = ?</label>
                <input 
                  type="text" 
                  value={newMethod.exchangeRate}
                  onChange={(e) => handleInputChange('exchangeRate', e.target.value)}
                  className="form-input"
                  placeholder="Ex: 10"
                />
              </div>
              <div className="form-group">
                <label>Minimum Limit *</label>
                <div className="input-with-symbol">
                  <span className="input-symbol">$</span>
                  <input 
                    type="number" 
                    value={newMethod.minLimit}
                    onChange={(e) => handleInputChange('minLimit', e.target.value)}
                    className="form-input with-symbol"
                    placeholder="Ex: 10"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Maximum Limit *</label>
                <div className="input-with-symbol">
                  <span className="input-symbol">$</span>
                  <input 
                    type="number" 
                    value={newMethod.maxLimit}
                    onChange={(e) => handleInputChange('maxLimit', e.target.value)}
                    className="form-input with-symbol"
                    placeholder="Ex: 100"
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Charge (%)</label>
                <div className="input-with-symbol">
                  <span className="input-symbol">%</span>
                  <input 
                    type="text" 
                    value={newMethod.charge}
                    onChange={(e) => handleInputChange('charge', e.target.value)}
                    className="form-input with-symbol"
                    placeholder="Ex: 5"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Information from User</label>
                <input 
                  type="text" 
                  value={newMethod.informationFromUser}
                  onChange={(e) => handleInputChange('informationFromUser', e.target.value)}
                  className="form-input"
                  placeholder="Ex: Your (TRC 20) Address"
                />
              </div>
            </div>

            <button className="save-method-button" onClick={handleSaveMethod}>
              Add Method
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Edit Method Form
  if (currentView === 'edit') {
    return (
      <div className="withdraw-methods">
        <div className="withdraw-header">
          <div className="withdraw-header-left">
            <div className="withdraw-icon">💸</div>
            <h1 className="withdraw-title">Update Withdraw Method</h1>
          </div>
          <button className="back-button" onClick={handleBackToList}>
            <span className="back-icon">←</span>
            Back
          </button>
        </div>

        <div className="withdraw-form-container">
          <div className="withdraw-form-section">
            <div className="form-row">
              <div className="form-group">
                <label>Method Name</label>
                <input 
                  type="text" 
                  value={editMethod.name}
                  onChange={(e) => handleEditInputChange('name', e.target.value)}
                  className="form-input"
                  placeholder="Ex: Binance"
                />
              </div>
              <div className="form-group">
                <label>Method Currency</label>
                <input 
                  type="text" 
                  value={editMethod.currency}
                  onChange={(e) => handleEditInputChange('currency', e.target.value)}
                  className="form-input"
                  placeholder="Ex: USDT"
                />
              </div>
              <div className="form-group">
                <label>Method Symbol</label>
                <input 
                  type="text" 
                  value={editMethod.symbol}
                  onChange={(e) => handleEditInputChange('symbol', e.target.value)}
                  className="form-input"
                  placeholder="Ex: $"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>1 USDT = ? {editMethod.currency || 'Ethereum'}</label>
                <input 
                  type="text" 
                  value={editMethod.exchangeRate}
                  onChange={(e) => handleEditInputChange('exchangeRate', e.target.value)}
                  className="form-input"
                  placeholder="Ex: 0.00044"
                />
              </div>
              <div className="form-group">
                <label>Minimum Limit</label>
                <div className="input-with-symbol">
                  <span className="input-symbol">$</span>
                  <input 
                    type="number" 
                    value={editMethod.minLimit}
                    onChange={(e) => handleEditInputChange('minLimit', e.target.value)}
                    className="form-input with-symbol"
                    placeholder="Ex: 10"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Maximum Limit</label>
                <div className="input-with-symbol">
                  <span className="input-symbol">$</span>
                  <input 
                    type="number" 
                    value={editMethod.maxLimit}
                    onChange={(e) => handleEditInputChange('maxLimit', e.target.value)}
                    className="form-input with-symbol"
                    placeholder="Ex: 100"
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Charge (%)</label>
                <div className="input-with-symbol">
                  <span className="input-symbol">%</span>
                  <input 
                    type="text" 
                    value={editMethod.charge}
                    onChange={(e) => handleEditInputChange('charge', e.target.value)}
                    className="form-input with-symbol"
                    placeholder="Ex: 1"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  className="form-select status-select"
                  value={editMethod.status}
                  onChange={(e) => handleEditInputChange('status', e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-row single">
              <div className="form-group">
                <label>Information from User</label>
                <input 
                  type="text" 
                  value={editMethod.informationFromUser}
                  onChange={(e) => handleEditInputChange('informationFromUser', e.target.value)}
                  className="form-input"
                  placeholder="Ex: Your (TRC 20) Address"
                />
              </div>
            </div>

            <button className="save-method-button" onClick={handleUpdateMethod}>
              Update This Method
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main List View
  return (
    <div className="withdraw-methods">
      <div className="withdraw-header">
        <div className="withdraw-header-left">
          <div className="withdraw-icon">💸</div>
          <h1 className="withdraw-title">Manage Withdraw Methods</h1>
        </div>
        <button className="add-method-button" onClick={handleAddMethod}>
          <span className="add-icon">+</span>
          Add Method
        </button>
      </div>

      <div className="withdraw-table-container">
        <table className="withdraw-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Currency</th>
              <th>Symbol</th>
              <th>Charge</th>
              <th>Min Limit - Max Limit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {withdrawMethods.map(method => (
              <tr key={method.id}>
                <td className="method-name">{method.name}</td>
                <td className="method-currency">{method.currency}</td>
                <td className="method-symbol">{method.symbol}</td>
                <td className="method-charge">{method.charge}</td>
                <td className="method-limits">
                  ${method.minLimit} - ${method.maxLimit}
                </td>
                <td>
                  <span 
                    className={`status-badge ${method.status}`}
                    onClick={() => handleStatusToggle(method.id)}
                  >
                    {method.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="edit-button"
                    onClick={() => handleEdit(method.id)}
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
  )
}

export default WithdrawalMethods