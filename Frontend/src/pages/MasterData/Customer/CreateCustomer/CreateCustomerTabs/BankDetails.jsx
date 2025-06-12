import  { useState } from 'react';
import './BankDetails.css';

const BankForm = () => {
  const [banks, setBanks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    accountType: '',
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    reenterAccountNumber: '',
    branchName: '',
    ifscCode: '',
    micrCode: ''
  });

  const accountTypes = ['Savings', 'Current', 'Fixed Deposit', 'Recurring Deposit'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBank = () => {
    setShowForm(true);
  };

  const handleSave = () => {
    if (formData.accountType && formData.bankName && formData.accountHolderName && 
        formData.accountNumber && formData.accountNumber === formData.reenterAccountNumber) {
      setBanks(prev => [...prev, { ...formData, id: Date.now() }]);
      setFormData({
        accountType: '',
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        reenterAccountNumber: '',
        branchName: '',
        ifscCode: '',
        micrCode: ''
      });
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      accountType: '',
      bankName: '',
      accountHolderName: '',
      accountNumber: '',
      reenterAccountNumber: '',
      branchName: '',
      ifscCode: '',
      micrCode: ''
    });
    setShowForm(false);
  };

  return (
    <div className="bf-bank-form-container">
      {showForm && (
        <div className="bf-form-wrapper">
          <div className="bf-form-grid">
            <div className="bf-form-row">
              <label className="bf-label">Account Type</label>
              <select 
                name="accountType" 
                value={formData.accountType}
                onChange={handleInputChange}
                className="bf-select-input"
              >
                <option value="">Select Account Type</option>
                {accountTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="bf-form-row">
              <label className="bf-label">Bank Name</label>
              <input 
                type="text" 
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="bf-text-input"
              />
            </div>

            <div className="bf-form-row">
              <label className="bf-label">Account Holder Name</label>
              <input 
                type="text" 
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleInputChange}
                className="bf-text-input"
              />
            </div>

            <div className="bf-form-row">
              <label className="bf-label">Account Number</label>
              <input 
                type="text" 
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className="bf-text-input"
              />
            </div>

            <div className="bf-form-row">
              <label className="bf-label bf-label-red">Re-enter Account Number</label>
              <input 
                type="text" 
                name="reenterAccountNumber"
                value={formData.reenterAccountNumber}
                onChange={handleInputChange}
                className="bf-text-input"
              />
            </div>

            <div className="bf-form-row">
              <label className="bf-label">Branch Name</label>
              <input 
                type="text" 
                name="branchName"
                value={formData.branchName}
                onChange={handleInputChange}
                className="bf-text-input"
              />
            </div>

            <div className="bf-form-row">
              <label className="bf-label">IFSC Code</label>
              <input 
                type="text" 
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                className="bf-text-input"
              />
            </div>

            <div className="bf-form-row">
              <label className="bf-label">MICR Code</label>
              <input 
                type="text" 
                name="micrCode"
                value={formData.micrCode}
                onChange={handleInputChange}
                className="bf-text-input"
              />
            </div>
          </div>

          <div className="bf-button-container">
            <button className="bf-save-button" onClick={handleSave}>
              Save
            </button>
            <button className="bf-cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {banks.length > 0 && (
        <div className="bf-banks-list">
          {banks.map(bank => (
            <div key={bank.id} className="bf-bank-item">
              <div className="bf-bank-details">
                <p><strong>Bank:</strong> {bank.bankName}</p>
                <p><strong>Account:</strong> {bank.accountNumber}</p>
                <p><strong>Holder:</strong> {bank.accountHolderName}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showForm && (
        <div className="bf-add-button-container">
          <button className="bf-add-button" onClick={handleAddBank}>
            <span className="bf-plus-icon">+</span>
            Add New Bank
          </button>
        </div>
      )}
    </div>
  );
};

export default BankForm;