import { useState } from 'react';
import './CreateCustomerTabs.css';

const ContactPersonForm = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    workPhone: '',
    mobile: '',
    designation: '',
    department: ''
  });

  const salutationOptions = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddContact = () => {
    setShowForm(true);
  };

  const handleSave = () => {
    if (formData.firstName && formData.lastName && formData.email) {
      setContacts(prev => [...prev, { ...formData, id: Date.now() }]);
      setFormData({
        salutation: '',
        firstName: '',
        lastName: '',
        email: '',
        workPhone: '',
        mobile: '',
        designation: '',
        department: ''
      });
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      workPhone: '',
      mobile: '',
      designation: '',
      department: ''
    });
    setShowForm(false);
  };

  return (
    <div className="cf-contact-form-container">
      <div className="cf-table-wrapper">
        <table className="cf-contact-table">
          <thead>
            <tr className="cf-header-row">
              <th className="cf-header-cell cf-salutation">Salutation</th>
              <th className="cf-header-cell cf-first-name">First Name</th>
              <th className="cf-header-cell cf-last-name">last Name</th>
              <th className="cf-header-cell cf-email">Email Address</th>
              <th className="cf-header-cell cf-work-phone">Work phone</th>
              <th className="cf-header-cell cf-mobile">Mobile</th>
              <th className="cf-header-cell cf-designation">Designation</th>
              <th className="cf-header-cell cf-department">Department</th>
            </tr>
          </thead>
          <tbody>
            {showForm && (
              <tr className="cf-form-row">
                <td className="cf-form-cell">
                  <select 
                    name="salutation" 
                    value={formData.salutation}
                    onChange={handleInputChange}
                    className="cf-select-input"
                  >
                    <option value="">Select</option>
                    {salutationOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className="cf-form-cell">
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="cf-text-input"
                    placeholder="First Name"
                  />
                </td>
                <td className="cf-form-cell">
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="cf-text-input"
                    placeholder="Last Name"
                  />
                </td>
                <td className="cf-form-cell">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="cf-text-input"
                    placeholder="Email Address"
                  />
                </td>
                <td className="cf-form-cell">
                  <input 
                    type="tel" 
                    name="workPhone"
                    value={formData.workPhone}
                    onChange={handleInputChange}
                    className="cf-text-input"
                    placeholder="Work Phone"
                  />
                </td>
                <td className="cf-form-cell">
                  <input 
                    type="tel" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="cf-text-input"
                    placeholder="Mobile"
                  />
                </td>
                <td className="cf-form-cell">
                  <input 
                    type="text" 
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="cf-text-input"
                    placeholder="Designation"
                  />
                </td>
                <td className="cf-form-cell">
                  <input 
                    type="text" 
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="cf-text-input"
                    placeholder="Department"
                  />
                </td>
              </tr>
            )}
            {contacts.map(contact => (
              <tr key={contact.id} className="cf-data-row">
                <td className="cf-data-cell">{contact.salutation}</td>
                <td className="cf-data-cell">{contact.firstName}</td>
                <td className="cf-data-cell">{contact.lastName}</td>
                <td className="cf-data-cell">{contact.email}</td>
                <td className="cf-data-cell">{contact.workPhone}</td>
                <td className="cf-data-cell">{contact.mobile}</td>
                <td className="cf-data-cell">{contact.designation}</td>
                <td className="cf-data-cell">{contact.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="cf-button-container">
        {!showForm ? (
          <button className="cf-add-button" onClick={handleAddContact}>
            <span className="cf-plus-icon">+</span>
            Add contact person
          </button>
        ) : (
          <div className="cf-action-buttons">
            <button className="cf-save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cf-cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPersonForm;