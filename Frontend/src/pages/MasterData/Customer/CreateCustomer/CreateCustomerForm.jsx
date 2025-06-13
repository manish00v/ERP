import { useState } from 'react';
import { FaPhone, FaMobile } from 'react-icons/fa';
import './CreateCustomerForm.css';
import ContactPersonForm from './CreateCustomerTabs/ContactPersons';
import BankForm from './CreateCustomerTabs/BankDetails';
import AccountingDetails from './CreateCustomerTabs/AccountingDetails';
import SalesShippingDetails from './CreateCustomerTabs/SalesShippingDetails';

const CreateCustomerForm = () => {
  const [customerType, setCustomerType] = useState('business');
  const [activeTab, setActiveTab] = useState('address');
  const [phoneType, setPhoneType] = useState('work');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [billingAddress, setBillingAddress] = useState({
    street1: '',
    street2: '',
    city: '',
    state: '',
    region: '',
    country: '',
    pinCode: ''
  });
  const [shippingAddress, setShippingAddress] = useState({
    street1: '',
    street2: '',
    city: '',
    state: '',
    region: '',
    country: '',
    pinCode: ''
  });

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const copyBillingToShipping = () => {
    setShippingAddress({ ...billingAddress });
  };

  const handlePhoneChange = (type) => {
    setPhoneType(type);
    setPhoneNumber(''); // Clear number when switching type
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(number);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">Create new Customer</h2>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="customerType"
              value="individual"
              checked={customerType === 'individual'}
              onChange={(e) => setCustomerType(e.target.value)}
              className="radio-input"
            />
            <span className={`radio-custom ${customerType === 'individual' ? 'radio-selected' : ''}`}></span>
            Individual
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="customerType"
              value="business"
              checked={customerType === 'business'}
              onChange={(e) => setCustomerType(e.target.value)}
              className="radio-input"
            />
            <span className={`radio-custom ${customerType === 'business' ? 'radio-selected' : ''}`}></span>
            Business
          </label>
        </div>
        <button className="btn btn-primary">Save</button>
      </div>

      <div className="form-section">
        {/* Primary Contact - Only show for Individual */}
        {customerType === 'individual' && (
          <div className="form-row">
            <label className="form-label">Primary Contact</label>
            <div className="input-group">
              <select className="form-select">
                <option>Salutation</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
                <option>Dr.</option>
              </select>
              <input type="text" placeholder="First name" className="form-input" />
              <input type="text" placeholder="Middle name" className="form-input" />
              <input type="text" placeholder="Last name" className="form-input" />
            </div>
          </div>
        )}

        {/* Company name - Only show for Business */}
        {customerType === 'business' && (
          <div className="form-row">
            <label className="form-label">Company name</label>
            <div className="input-group">
              <input type="text" className="form-input input-full" placeholder="Enter company name" />
            </div>
          </div>
        )}

        {/* Website - Only show for Business */}
        {customerType === 'business' && (
          <div className="form-row">
            <label className="form-label">Website</label>
            <div className="input-group">
              <input type="text" className="form-input input-full" placeholder="https://example.com" />
            </div>
          </div>
        )}

        <div className="form-row">
          <label className="form-label">Email Address</label>
          <div className="input-group">
            <input type="email" className="form-input input-full" placeholder="user@example.com" />
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Phone</label>
          <div className="input-group">
            <div className="phone-input-container">
              <div className="phone-type-selector">
                <button 
                  className={`btn ${phoneType === 'work' ? 'btn-info' : 'btn-light'}`}
                  onClick={() => handlePhoneChange('work')}
                >
                  <FaPhone className="phone-icon" />
                  Work
                </button>
                <button 
                  className={`btn ${phoneType === 'mobile' ? 'btn-info' : 'btn-light'}`}
                  onClick={() => handlePhoneChange('mobile')}
                >
                  <FaMobile className="phone-icon" />
                  Mobile
                </button>
              </div>
              <input
                type="tel"
                className="form-input phone-number-input"
                placeholder={phoneType === 'work' ? 'Work phone number' : 'Mobile number'}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                pattern="[0-9]{10,15}"
                required
              />
              {phoneNumber && !validatePhoneNumber(phoneNumber) && (
                <span className="error-message">Please enter a valid phone number (10-15 digits)</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Lifecycle status</label>
          <select className="form-select">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="form-row">
          <label className="form-label">Partner Classification</label>
          <select className="form-select">
            <option>Select classification</option>
            <option>Strategic</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'address' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('address')}
        >
          Address
        </button>
        <button 
          className={`tab ${activeTab === 'contact' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact persons
        </button>
        <button 
          className={`tab ${activeTab === 'bank' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('bank')}
        >
          Bank Details
        </button>
        <button 
          className={`tab ${activeTab === 'accounting' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('accounting')}
        >
          Accounting Details
        </button>
        <button 
          className={`tab ${activeTab === 'sales' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales & Shipping Details
        </button>
        <button 
          className={`tab ${activeTab === 'related' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('related')}
        >
          Related Parties
        </button>
      </div>

      {activeTab === 'address' && (
        <div className="address-section">
          <div className="address-container">
            <div className="address-column">
              <h3 className="section-title">Billing Address</h3>
              
              <div className="address-row">
                <label className="address-label">Street 1</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="street1"
                  value={billingAddress.street1}
                  onChange={handleBillingChange}
                  placeholder="Enter street address"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">Street 2</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="street2"
                  value={billingAddress.street2}
                  onChange={handleBillingChange}
                  placeholder="Apt, suite, etc. (optional)"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">City</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="city"
                  value={billingAddress.city}
                  onChange={handleBillingChange}
                  placeholder="Enter city"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">State</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="state"
                  value={billingAddress.state}
                  onChange={handleBillingChange}
                  placeholder="Enter state"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">Region</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="region"
                  value={billingAddress.region}
                  onChange={handleBillingChange}
                  placeholder="Enter region"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">Country</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="country"
                  value={billingAddress.country}
                  onChange={handleBillingChange}
                  placeholder="Enter country"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">PIN Code</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="pinCode"
                  value={billingAddress.pinCode}
                  onChange={handleBillingChange}
                  placeholder="Enter postal code"
                />
              </div>
            </div>

            <div className="address-column">
              <div className="section-header">
                <h3 className="section-title">Shipping Address</h3>
                <button className="btn-link" onClick={copyBillingToShipping}>(Copy billing address) ↓</button>
              </div>
              
              <div className="address-row">
                <label className="address-label">Street 1</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="street1"
                  value={shippingAddress.street1}
                  onChange={handleShippingChange}
                  placeholder="Enter street address"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">Street 2</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="street2"
                  value={shippingAddress.street2}
                  onChange={handleShippingChange}
                  placeholder="Apt, suite, etc. (optional)"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">City</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleShippingChange}
                  placeholder="Enter city"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">State</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleShippingChange}
                  placeholder="Enter state"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">Region</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="region"
                  value={shippingAddress.region}
                  onChange={handleShippingChange}
                  placeholder="Enter region"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">Country</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleShippingChange}
                  placeholder="Enter country"
                />
              </div>
              
              <div className="address-row">
                <label className="address-label">PIN Code</label>
                <input 
                  type="text" 
                  className="address-input" 
                  name="pinCode"
                  value={shippingAddress.pinCode}
                  onChange={handleShippingChange}
                  placeholder="Enter postal code"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="form-section">
          <ContactPersonForm />
        </div>
      )}

      {activeTab === 'bank' && (
        <div className="form-section">
          <BankForm />
        </div>
      )}

      {activeTab === 'accounting' && (
        <div className="form-section">
          <AccountingDetails />
        </div>
      )}

      {activeTab === 'sales' && (
        <div className="form-section">
          <SalesShippingDetails />
        </div>
      )}
    </div>
  );
};

export default CreateCustomerForm;