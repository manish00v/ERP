import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './DisplayCustomerPage.css';

const DisplayCustomer = () => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const navigate = useNavigate(); // for back button navigation
  const [customers] = useState([
    {
      id: 1234,
      name: 'ABC',
      company: 'ZUUU',
      email: 'example@gmail.com',
      phone: '878965321',
      receivables: 'Rs.0.0',
      status: 'Active'
    },
    {
      id: 2222,
      name: 'DEF',
      company: 'EAGLE',
      email: 'YYY@gmail.com',
      phone: '785652544',
      receivables: 'Rs.10250.0',
      status: 'Inactive'
    }
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState('All Customers');

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCustomers(customers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleFilterSelect = (filterType) => {
    setFilter(filterType);
    setDropdownOpen(false);
    // Here you would typically filter the customers list
    // For now we're just setting the filter text
  };

  const handleMarkStatus = (status) => {
    // Here you would update the status of selected customers
    console.log(`Marking ${selectedCustomers} as ${status}`);
    setSelectedCustomers([]);
  };

  const handleDelete = () => {
    // Here you would delete the selected customers
    console.log(`Deleting ${selectedCustomers}`);
    setSelectedCustomers([]);
  };

  const filteredCustomers = customers.filter(customer => {
    if (filter === 'Active Customers') return customer.status === 'Active';
    if (filter === 'Inactive Customers') return customer.status === 'Inactive';
    if (filter === 'Duplicate Customers') return false; // Add your duplicate logic here
    return true; // All Customers
  });

  return (
    <div className="custmgmt-container">
      {/* Header */}
      <div className="custmgmt-header">
      <div className="custmgmt-header-left">
        <button 
          className="custmgmt-back-btn" 
          onClick={() => navigate(-1)} // go back to previous page
        >
          <span className="custmgmt-back-arrow">‹</span>
        </button>
        <h1 className="custmgmt-title">Customers</h1>
      </div>

      <Link to="/createCustomerForm">
        <button className="custmgmt-create-btn">Create</button>
      </Link>
    </div>
      {/* /createCustomerForm */}

      {/* Filter Dropdown */}
      <div className="custmgmt-filter-section">
        <div className="custmgmt-dropdown">
          <button 
            className="custmgmt-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {filter}
            <span className="custmgmt-dropdown-arrow">▼</span>
          </button>
          {dropdownOpen && (
            <div className="custmgmt-dropdown-menu">
              <div 
                className={`custmgmt-dropdown-item ${filter === 'All Customers' ? 'custmgmt-active' : ''}`}
                onClick={() => handleFilterSelect('All Customers')}
              >
                All Customers
              </div>
              <div 
                className={`custmgmt-dropdown-item ${filter === 'Active Customers' ? 'custmgmt-active' : ''}`}
                onClick={() => handleFilterSelect('Active Customers')}
              >
                Active Customers
              </div>
              <div 
                className={`custmgmt-dropdown-item ${filter === 'Inactive Customers' ? 'custmgmt-active' : ''}`}
                onClick={() => handleFilterSelect('Inactive Customers')}
              >
                Inactive Customers
              </div>
              <div 
                className={`custmgmt-dropdown-item ${filter === 'Duplicate Customers' ? 'custmgmt-active' : ''}`}
                onClick={() => handleFilterSelect('Duplicate Customers')}
              >
                Duplicate Customers
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Bar - Always visible */}
      <div className="custmgmt-action-bar">
        <div className="custmgmt-action-buttons">
          <button 
            className="custmgmt-action-btn custmgmt-mark-active"
            onClick={() => handleMarkStatus('Active')}
            disabled={selectedCustomers.length === 0}
          >
            Mark as Active
          </button>
          <button 
            className="custmgmt-action-btn custmgmt-mark-inactive"
            onClick={() => handleMarkStatus('Inactive')}
            disabled={selectedCustomers.length === 0}
          >
            Mark as Inactive
          </button>
          <button 
            className="custmgmt-action-btn custmgmt-delete"
            onClick={handleDelete}
            disabled={selectedCustomers.length === 0}
          >
            Delete
          </button>
        </div>
        <button 
          className="custmgmt-close-btn"
          onClick={() => setSelectedCustomers([])}
          disabled={selectedCustomers.length === 0}
        >
          ✕
        </button>
      </div>

      {/* Table */}
      <div className="custmgmt-table-wrapper">
        <table className="custmgmt-table">
          <thead>
            <tr className="custmgmt-table-header">
              <th className="custmgmt-checkbox-col">
                <input 
                  type="checkbox" 
                  className="custmgmt-checkbox"
                  onChange={handleSelectAll}
                  checked={selectedCustomers.length === customers.length && customers.length > 0}
                />
              </th>
              <th className="custmgmt-th">Customer ID</th>
              <th className="custmgmt-th">Customer Name</th>
              <th className="custmgmt-th">Company Name</th>
              <th className="custmgmt-th">Email</th>
              <th className="custmgmt-th">Work Phone</th>
              <th className="custmgmt-th">Receivables</th>
              <th className="custmgmt-th">Life cycle Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="custmgmt-table-row">
                <td className="custmgmt-checkbox-col">
                  <input 
                    type="checkbox" 
                    className="custmgmt-checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                  />
                </td>
                <td className="custmgmt-td">{customer.id}</td>
                <td className="custmgmt-td">{customer.name}</td>
                <td className="custmgmt-td custmgmt-company-cell">
                  {customer.company}
                  <div className="custmgmt-tooltip">
                    Should Display company name if Customer is Business Customer
                  </div>
                </td>
                <td className="custmgmt-td">{customer.email}</td>
                <td className="custmgmt-td">{customer.phone}</td>
                <td className="custmgmt-td">{customer.receivables}</td>
                <td className="custmgmt-td">
                  <span className={`custmgmt-status ${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayCustomer;