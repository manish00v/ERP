import { useState, useEffect } from "react";
import axios from 'axios';
import '../BUMFUBE/CreateAssignmentTable/createAssignmentTable.css';

function CreateMfuDlAssignmentTable() {
  // State for options data
  const [mfuOptions, setMfuOptions] = useState([]);
  const [dlOptions, setDlOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // State for table data
  const [assignmentData, setAssignmentData] = useState([
    { 
      mfuCode: '', 
      mfuName: '', 
      dlCode: '', 
      dlName: '' 
    }
  ]);

  // Fetch options data on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [mfuRes, dlRes] = await Promise.all([
          axios.get('http://localhost:3003/api/factory-units'),
          axios.get('http://localhost:3003/api/delivery-locations')
        ]);
        
        setMfuOptions(mfuRes.data.map(item => ({
          code: item.factoryUnitCode,
          name: item.factoryUnitName || '',
          currentDlCode: item.deliveryLocationCode // Store current DL assignment if exists
        })));
        
        setDlOptions(dlRes.data.map(item => ({
          code: item.deliveryLocationCode,
          name: item.deliveryLocationName || ''
        })));
        
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        console.error('Error fetching options:', err);
      }
    };

    fetchOptions();
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Validate data first
      for (const row of assignmentData) {
        if (!row.mfuCode || !row.dlCode) {
          throw new Error('Please fill in all required fields before saving');
        }
      }
      
      // Prepare and send update requests using PUT
      const updatePromises = assignmentData.map(row => {
        return axios.put(
          `http://localhost:3003/api/factory-units/${row.mfuCode}`,
          { deliveryLocationCode: row.dlCode }
        );
      });

      await Promise.all(updatePromises);
      alert('Delivery locations assigned successfully!');
      window.history.back();
    } catch (err) {
      console.error('Error saving data:', err);
      alert(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddRow = () => {
    setAssignmentData([...assignmentData, { 
      mfuCode: '', 
      mfuName: '', 
      dlCode: '', 
      dlName: '' 
    }]);
  };

  const handleRemoveRow = (index) => {
    if (assignmentData.length > 1) {
      const newData = assignmentData.filter((_, i) => i !== index);
      setAssignmentData(newData);
    }
  };

  const handleCodeChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
    
    // Update corresponding name based on selected code
    let options, nameField;
    if (field === 'mfuCode') {
      options = mfuOptions;
      nameField = 'mfuName';
      
      // When MFU is selected, pre-select its current delivery location if exists
      const selectedMfu = options.find(opt => opt.code === value);
      if (selectedMfu?.currentDlCode) {
        newData[index].dlCode = selectedMfu.currentDlCode;
        const selectedDl = dlOptions.find(dl => dl.code === selectedMfu.currentDlCode);
        newData[index].dlName = selectedDl?.name || '';
      }
    } else if (field === 'dlCode') {
      options = dlOptions;
      nameField = 'dlName';
    }
    
    const selectedOption = options.find(opt => opt.code === value);
    newData[index][nameField] = selectedOption ? selectedOption.name : '';
    
    setAssignmentData(newData);
  };

  if (isLoading) {
    return <div className="assignment-container">Loading options...</div>;
  }

  if (error) {
    return <div className="assignment-container">Error: {error}</div>;
  }

  return (
    <div className="assignment-container">
      {/* Action buttons */}
      <div className="assignment-button-wrapper">
        <button 
          onClick={handleBack} 
          className="assignment-cancel-button"
          disabled={isSaving}
        >
          Cancel
        </button>
        <button 
          onClick={handleSave} 
          className="assignment-save-button"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Assignment Table */}
      <div className="assignment-table-wrapper">
        <table className="assignment-table">
          <thead>
            <tr>
              <th>MFU Code</th>
              <th>MFU Name</th>
              <th>DL Code</th>
              <th>DL Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignmentData.map((assignment, index) => (
              <tr key={index}>
                {/* MFU Code Dropdown */}
                <td>
                  <select
                    value={assignment.mfuCode}
                    onChange={(e) => handleCodeChange(index, 'mfuCode', e.target.value)}
                    className="assignment-code-dropdown"
                    disabled={isSaving}
                  >
                    <option value="">Select</option>
                    {mfuOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* MFU Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.mfuName}
                    className="assignment-desc-input"
                    readOnly
                  />
                </td>
                
                {/* DL Code Dropdown */}
                <td>
                  <select
                    value={assignment.dlCode}
                    onChange={(e) => handleCodeChange(index, 'dlCode', e.target.value)}
                    className="assignment-code-dropdown"
                    disabled={isSaving || !assignment.mfuCode}
                  >
                    <option value="">Select</option>
                    {dlOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* DL Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.dlName}
                    className="assignment-desc-input"
                    readOnly
                  />
                </td>

                {/* Actions column with delete icon */}
                <td>
                  {assignmentData.length > 1 && (
                    <button 
                      onClick={() => handleRemoveRow(index)} 
                      className="remove-row-button"
                      title="Remove row"
                      disabled={isSaving}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
            
            {/* Add row button in the last row */}
            <tr>
              <td colSpan="5" className="add-row-cell">
                <button 
                  onClick={handleAddRow} 
                  className="add-row-button"
                  title="Add new row"
                  disabled={isSaving}
                >
                  <i className="fas fa-plus-circle"></i> Add Row
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreateMfuDlAssignmentTable;