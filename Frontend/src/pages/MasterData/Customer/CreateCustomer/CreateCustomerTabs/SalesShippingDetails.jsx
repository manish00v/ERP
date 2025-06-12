
import './SalesShippingDetails.css';

const SalesShippingDetails = () => {
  return (
    <div className="bf-container">
      <div className="bf-form-grid">
        {/* Left Column */}
        <div className="bf-left-column">
          <div className="bf-field-row">
            <label className="bf-field-label">Business Unit Code</label>
            <div className="bf-input-box"></div>
          </div>
          
          <div className="bf-field-row">
            <label className="bf-field-label">Sales Channel Code</label>
            <div className="bf-input-box"></div>
          </div>
          
          <div className="bf-field-row">
            <label className="bf-field-label">Sales Team</label>
            <div className="bf-input-box"></div>
          </div>
          
          <div className="bf-field-row">
            <label className="bf-field-label">Discount Allowed</label>
            <div className="bf-input-box"></div>
          </div>
          
          <div className="bf-field-row">
            <label className="bf-field-label">Customer Discount Group</label>
            <div className="bf-input-box"></div>
          </div>
          
          <div className="bf-field-row">
            <label className="bf-field-label">Freight</label>
            <div className="bf-input-box"></div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bf-right-column">
          <div className="bf-field-row">
            <label className="bf-field-label">Shipping Conditions</label>
            <div className="bf-input-box"></div>
          </div>
          
          <div className="bf-field-row">
            <label className="bf-field-label">Shipment Priority</label>
            <div className="bf-input-box"></div>
          </div>
          
          <div className="bf-field-row">
            <label className="bf-field-label">MFU Code</label>
            <div className="bf-input-box"></div>
          </div>
          
          <div className="bf-field-row">
            <label className="bf-field-label">Partial Deliveries allowed</label>
            <div className="bf-input-box"></div>
          </div>
          
          <div className="bf-field-row">
            <label className="bf-field-label">Payment Terms</label>
            <div className="bf-input-box"></div>
          </div>
        </div>
      </div>
      
      <div className="bf-button-container">
        <button className="bf-cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default SalesShippingDetails;
