import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DisplayCustomerPage.css';

const DisplayCustomer = () => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([
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
  };

  const handleMarkStatus = (status) => {
    setCustomers(customers.map(customer => 
      selectedCustomers.includes(customer.id) 
        ? {...customer, status: status} 
        : customer
    ));
    setSelectedCustomers([]);
  };

  const handleDelete = () => {
    setCustomers(customers.filter(customer => 
      !selectedCustomers.includes(customer.id)
    ));
    setSelectedCustomers([]);
  };

  const filteredCustomers = customers.filter(customer => {
    if (filter === 'Active Customers') return customer.status === 'Active';
    if (filter === 'Inactive Customers') return customer.status === 'Inactive';
    if (filter === 'Duplicate Customers') return false;
    return true;
  });

  return (
    <div className="customer-container">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <span className="back-arrow">‹</span>
          </button>
          <h1 className="title">Customers</h1>
        </div>
        <Link to="/createCustomerForm">
          <button className="create-btn-customer">Create</button>
        </Link>
      </div>

      {/* Filter Dropdown */}
      <div className="filter-section">
        <div className="dropdown">
          <button 
            className="dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {filter}
            <span className="dropdown-arrow">▼</span>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div 
                className={`dropdown-item ${filter === 'All Customers' ? 'active' : ''}`}
                onClick={() => handleFilterSelect('All Customers')}
              >
                All Customers
              </div>
              <div 
                className={`dropdown-item ${filter === 'Active Customers' ? 'active' : ''}`}
                onClick={() => handleFilterSelect('Active Customers')}
              >
                Active Customers
              </div>
              <div 
                className={`dropdown-item ${filter === 'Inactive Customers' ? 'active' : ''}`}
                onClick={() => handleFilterSelect('Inactive Customers')}
              >
                Inactive Customers
              </div>
              <div 
                className={`dropdown-item ${filter === 'Duplicate Customers' ? 'active' : ''}`}
                onClick={() => handleFilterSelect('Duplicate Customers')}
              >
                Duplicate Customers
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Bar - Only visible when customers are selected */}
      {selectedCustomers.length > 0 && (
        <div className="action-bar">
          <div className="action-buttons">
            <button 
              className="action-btn mark-active"
              onClick={() => handleMarkStatus('Active')}
            >
              Mark as Active
            </button>
            <button 
              className="action-btn mark-inactive"
              onClick={() => handleMarkStatus('Inactive')}
            >
              Mark as Inactive
            </button>
            <button 
              className="action-btn delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <button 
            className="close-btn"
            onClick={() => setSelectedCustomers([])}
          >
            ✕
          </button>
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr className="table-header">
              <th className="checkbox-col">
                <input 
                  type="checkbox" 
                  className="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedCustomers.length === customers.length && customers.length > 0}
                />
              </th>
              <th className="th">Customer ID</th>
              <th className="th">Customer Name</th>
              <th className="th">Company Name</th>
              <th className="th">Email</th>
              <th className="th">Work Phone</th>
              <th className="th">Receivables</th>
              <th className="th">Life cycle Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="table-row">
                <td className="checkbox-col">
                  <input 
                    type="checkbox" 
                    className="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                  />
                </td>
                <td className="td">{customer.id}</td>
                <td className="td">{customer.name}</td>
                <td className="td company-cell">
                  {customer.company}
                  <div className="tooltip">
                    Should Display company name if Customer is Business Customer
                  </div>
                </td>
                <td className="td">{customer.email}</td>
                <td className="td">{customer.phone}</td>
                <td className="td">{customer.receivables}</td>
                <td className="td">
                  <span className={`status ${customer.status.toLowerCase()}`}>
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