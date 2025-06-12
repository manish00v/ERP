import { useState } from 'react';
import './CreateCustomerForm.css';
import ContactPersonForm from './CreateCustomerTabs/ContactPersons';
import BankForm from './CreateCustomerTabs/BankDetails';
import AccountingDetails from './CreateCustomerTabs/AccountingDetails';
import SalesShippingDetails from './CreateCustomerTabs/SalesShippingDetails';

const CreateCustomerForm = () => {
  const [customerType, setCustomerType] = useState('business');
  const [activeTab, setActiveTab] = useState('address');

  return (
    <div className="cfm-container">
      <div className="cfm-header">
        <h2 className="cfm-title">Create new Customer</h2>
        <div className="cfm-radio-group">
          <label className="cfm-radio-label">
            <input
              type="radio"
              name="customerType"
              value="individual"
              checked={customerType === 'individual'}
              onChange={(e) => setCustomerType(e.target.value)}
              className="cfm-radio-input"
            />
            <span className="cfm-radio-custom"></span>
            Individual
          </label>
          <label className="cfm-radio-label">
            <input
              type="radio"
              name="customerType"
              value="business"
              checked={customerType === 'business'}
              onChange={(e) => setCustomerType(e.target.value)}
              className="cfm-radio-input"
            />
            <span className="cfm-radio-custom cfm-radio-selected"></span>
            Business
          </label>
        </div>
        <button className="cfm-save-btn">Save</button>
      </div>

      <div className="cfm-form-section">
        {/* Primary Contact - Only show for Business */}
{customerType === 'business' && (
  <div className="cfm-form-row">
    <label className="cfm-label">Primary Contact</label>
    <div className="cfm-input-group">
      <select className="cfm-select cfm-select-salutation">
        <option>salutation</option>
      </select>
      <input type="text" placeholder="First name" className="cfm-input cfm-input-first" />
      <input type="text" placeholder="Middle name" className="cfm-input cfm-input-middle" />
      <input type="text" placeholder="Last name" className="cfm-input cfm-input-last" />
      <span className="cfm-individual-only">Individual only</span>
    </div>
  </div>
)}

{/* Company name - Only show for Business */}
{customerType === 'business' && (
  <div className="cfm-form-row">
    <label className="cfm-label">Company name</label>
    <div className="cfm-input-group">
      <input type="text" className="cfm-input cfm-input-company" />
      <span className="cfm-help-text">Company Name should be available if supplier is not individual</span>
    </div>
  </div>
)}

{/* Website - Only show for Business */}
{customerType === 'business' && (
  <div className="cfm-form-row">
    <label className="cfm-label">Website</label>
    <div className="cfm-input-group">
      <input type="text" className="cfm-input cfm-input-website" />
      <span className="cfm-help-text">for individual there is no website only applicable for business supplier</span>
    </div>
  </div>
)}

        <div className="cfm-form-row">
          <label className="cfm-label">Email Address</label>
          <input type="email" className="cfm-input cfm-input-email" />
        </div>

        <div className="cfm-form-row">
          <label className="cfm-label">Phone</label>
          <div className="cfm-phone-group">
            <button className="cfm-phone-btn cfm-phone-work">
              <span className="cfm-phone-icon">👤</span>
              work
            </button>
            <button className="cfm-phone-btn cfm-phone-mobile">
              <span className="cfm-phone-icon">📱</span>
              Mobile
            </button>
          </div>
        </div>

        <div className="cfm-form-row">
          <label className="cfm-label">Website</label>
          <div className="cfm-input-group">
            <input type="text" className="cfm-input cfm-input-website" />
            <span className="cfm-help-text">for individual there is no website only applicable for business supplier</span>
          </div>
        </div>

        <div className="cfm-form-row">
          <label className="cfm-label">Lifecycle status</label>
          <input type="text" className="cfm-input cfm-input-lifecycle" />
        </div>

        <div className="cfm-form-row">
          <label className="cfm-label">Partner Classification</label>
          <select className="cfm-select cfm-select-partner">
            <option>Select classification</option>
          </select>
        </div>
      </div>

      <div className="cfm-tabs">
        <button 
          className={`cfm-tab ${activeTab === 'address' ? 'cfm-tab-active' : ''}`}
          onClick={() => setActiveTab('address')}
        >
          Address
        </button>
        <button 
          className={`cfm-tab ${activeTab === 'contact' ? 'cfm-tab-active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact persons
        </button>
        <button 
          className={`cfm-tab ${activeTab === 'bank' ? 'cfm-tab-active' : ''}`}
          onClick={() => setActiveTab('bank')}
        >
          Bank Details
        </button>
        <button 
          className={`cfm-tab ${activeTab === 'accounting' ? 'cfm-tab-active' : ''}`}
          onClick={() => setActiveTab('accounting')}
        >
          Accounting Details
        </button>
        <button 
          className={`cfm-tab ${activeTab === 'sales' ? 'cfm-tab-active' : ''}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales & Shipping Details
        </button>
        <button 
          className={`cfm-tab ${activeTab === 'related' ? 'cfm-tab-active' : ''}`}
          onClick={() => setActiveTab('related')}
        >
          Related Parties
        </button>
      </div>

      {activeTab === 'address' && (
        <div className="cfm-address-section">
          <div className="cfm-address-container">
            <div className="cfm-address-column">
              <h3 className="cfm-address-title">Billing Address</h3>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">Street 1</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">Street 2</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">City</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">State</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">Region</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">Country</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">PIN Code</label>
                <input type="text" className="cfm-address-input" />
              </div>
            </div>

            <div className="cfm-address-column">
              <div className="cfm-shipping-header">
                <h3 className="cfm-address-title">Shipping Address</h3>
                <button className="cfm-copy-btn">(Copy billing address) ↓</button>
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">Street 1</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">Street 2</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">City</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">State</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">Region</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">Country</label>
                <input type="text" className="cfm-address-input" />
              </div>
              
              <div className="cfm-address-row">
                <label className="cfm-address-label">PIN Code</label>
                <input type="text" className="cfm-address-input" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="cfm-contact-section">
          <ContactPersonForm />
        </div>
      )}

      {activeTab === 'bank' && (
        <div className="cfm-bank-section">
          <BankForm />
        </div>
      )}

      {activeTab === 'accounting' && (
        <div className="cfm-accounting-section">
          <AccountingDetails />
        </div>

      )}
        {activeTab === 'sales' && (
            <div className="cfm-sales-section">
            <SalesShippingDetails />
            </div>
        )}
     
    </div>
  );
};

export default CreateCustomerForm;