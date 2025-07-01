import React, { useState } from 'react'

const DepositMethods = () => {
  const [currentView, setCurrentView] = useState('list') // 'list', 'add', 'edit'
  const [editingMethod, setEditingMethod] = useState(null)
  const [depositMethods, setDepositMethods] = useState([
    {
      id: 1,
      name: 'Bitcoin',
      currency: 'BTC',
      symbol: '$',
      minLimit: 50,
      maxLimit: 100000,
      status: 'active',
      exchangeRate: '?',
      paymentAddressType: 'BTC Address',
      paymentAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
    },
    {
      id: 2,
      name: 'ETH (Ethereum)',
      currency: 'ETH',
      symbol: '$',
      minLimit: 50,
      maxLimit: 100000,
      status: 'active',
      exchangeRate: '?',
      paymentAddressType: 'ETH Address',
      paymentAddress: '0x742d35Cc6634C0532925a3b8D4C9db4C4C4C4C4C'
    },
    {
      id: 3,
      name: 'USDT (TRC 20)',
      currency: 'USDT',
      symbol: '$',
      minLimit: 50,
      maxLimit: 100000,
      status: 'active',
      exchangeRate: '?',
      paymentAddressType: 'USDT (TRC 20) Address',
      paymentAddress: 'TAjQiD4J3xJbNAaEbE3EvcuvSygXgM4rA5'
    }
  ])

  const [newMethod, setNewMethod] = useState({
    name: '',
    currency: '',
    symbol: '$',
    minLimit: '',
    maxLimit: '',
    status: 'active',
    exchangeRate: '',
    paymentAddressType: '',
    paymentAddress: ''
  })

  const [editMethod, setEditMethod] = useState({
    name: '',
    currency: '',
    symbol: '$',
    minLimit: '',
    maxLimit: '',
    status: 'active',
    exchangeRate: '',
    paymentAddressType: '',
    paymentAddress: ''
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
      minLimit: '',
      maxLimit: '',
      status: 'active',
      exchangeRate: '',
      paymentAddressType: '',
      paymentAddress: ''
    })
    setEditMethod({
      name: '',
      currency: '',
      symbol: '$',
      minLimit: '',
      maxLimit: '',
      status: 'active',
      exchangeRate: '',
      paymentAddressType: '',
      paymentAddress: ''
    })
  }

  const handleSaveMethod = () => {
    if (newMethod.name && newMethod.currency && newMethod.minLimit && newMethod.maxLimit) {
      const method = {
        id: depositMethods.length + 1,
        ...newMethod,
        minLimit: Number(newMethod.minLimit),
        maxLimit: Number(newMethod.maxLimit)
      }
      setDepositMethods([...depositMethods, method])
      handleBackToList()
      alert('Deposit method added successfully!')
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
    const methodToEdit = depositMethods.find(method => method.id === id)
    if (methodToEdit) {
      setEditingMethod(methodToEdit)
      setEditMethod({
        name: methodToEdit.name,
        currency: methodToEdit.currency,
        symbol: methodToEdit.symbol,
        minLimit: methodToEdit.minLimit.toString(),
        maxLimit: methodToEdit.maxLimit.toString(),
        status: methodToEdit.status,
        exchangeRate: methodToEdit.exchangeRate,
        paymentAddressType: methodToEdit.paymentAddressType,
        paymentAddress: methodToEdit.paymentAddress
      })
      setCurrentView('edit')
    }
  }

  const handleUpdateMethod = () => {
    if (editMethod.name && editMethod.currency && editMethod.minLimit && editMethod.maxLimit) {
      setDepositMethods(prev => 
        prev.map(method => 
          method.id === editingMethod.id 
            ? {
                ...method,
                name: editMethod.name,
                currency: editMethod.currency,
                symbol: editMethod.symbol,
                minLimit: Number(editMethod.minLimit),
                maxLimit: Number(editMethod.maxLimit),
                status: editMethod.status,
                exchangeRate: editMethod.exchangeRate,
                paymentAddressType: editMethod.paymentAddressType,
                paymentAddress: editMethod.paymentAddress
              }
            : method
        )
      )
      handleBackToList()
      alert('Deposit method updated successfully!')
    } else {
      alert('Please fill in all required fields')
    }
  }

  const handleStatusToggle = (id) => {
    setDepositMethods(prev => 
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
      <div className="deposit-methods">
        <div className="deposit-header">
          <div className="deposit-header-left">
            <div className="deposit-icon">💳</div>
            <h1 className="deposit-title">Add Deposit Method</h1>
          </div>
          <button className="back-button" onClick={handleBackToList}>
            <span className="back-icon">←</span>
            Back
          </button>
        </div>

        <div className="deposit-form-container">
          <div className="deposit-form-section">
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
                <label>1 {newMethod.currency || 'USDT'} = ?</label>
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
                <label>Payment Address Type</label>
                <input 
                  type="text" 
                  value={newMethod.paymentAddressType}
                  onChange={(e) => handleInputChange('paymentAddressType', e.target.value)}
                  className="form-input"
                  placeholder="Ex: USDT (TRC 20) Address"
                />
              </div>
              <div className="form-group">
                <label>Payment Address</label>
                <input 
                  type="text" 
                  value={newMethod.paymentAddress}
                  onChange={(e) => handleInputChange('paymentAddress', e.target.value)}
                  className="form-input"
                  placeholder="Ex: TAjQiD4J3xJbNAaEbE3EvcuvSygXgM4rA5"
                />
              </div>
            </div>

            <div className="form-row single">
              <div className="form-group">
                <label>Status</label>
                <select 
                  className="form-select status-select"
                  value={newMethod.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <button className="save-method-button" onClick={handleSaveMethod}>
              Save This Method
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Edit Method Form
  if (currentView === 'edit') {
    return (
      <div className="deposit-methods">
        <div className="deposit-header">
          <div className="deposit-header-left">
            <div className="deposit-icon">💳</div>
            <h1 className="deposit-title">Update Deposit Method</h1>
          </div>
          <button className="back-button" onClick={handleBackToList}>
            <span className="back-icon">←</span>
            Back
          </button>
        </div>

        <div className="deposit-form-container">
          <div className="deposit-form-section">
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
                <label>1 {editMethod.currency || 'USDT'} = ?</label>
                <input 
                  type="text" 
                  value={editMethod.exchangeRate}
                  onChange={(e) => handleEditInputChange('exchangeRate', e.target.value)}
                  className="form-input"
                  placeholder="Ex: 10"
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
                <label>Payment Address Type</label>
                <input 
                  type="text" 
                  value={editMethod.paymentAddressType}
                  onChange={(e) => handleEditInputChange('paymentAddressType', e.target.value)}
                  className="form-input"
                  placeholder="Ex: USDT (TRC 20) Address"
                />
              </div>
              <div className="form-group">
                <label>Payment Address</label>
                <input 
                  type="text" 
                  value={editMethod.paymentAddress}
                  onChange={(e) => handleEditInputChange('paymentAddress', e.target.value)}
                  className="form-input"
                  placeholder="Ex: TAjQiD4J3xJbNAaEbE3EvcuvSygXgM4rA5"
                />
              </div>
            </div>

            <div className="form-row single">
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
    <div className="deposit-methods">
      <div className="deposit-header">
        <div className="deposit-header-left">
          <div className="deposit-icon">💳</div>
          <h1 className="deposit-title">Manage Deposit Methods</h1>
        </div>
        <button className="add-method-button" onClick={handleAddMethod}>
          <span className="add-icon">+</span>
          Add Method
        </button>
      </div>

      <div className="deposit-table-container">
        <table className="deposit-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Currency</th>
              <th>Symbol</th>
              <th>Min Limit - Max Limit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {depositMethods.map(method => (
              <tr key={method.id}>
                <td className="method-name">{method.name}</td>
                <td className="method-currency">{method.currency}</td>
                <td className="method-symbol">{method.symbol}</td>
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

export default DepositMethods