import { useState, useEffect } from "react";
import axios from 'axios';
import '../BUMFUBE/CreateAssignmentTable/createAssignmentTable.css';

function CreateMfuIuIbAssignmentTable() {
  // State for options data
  const [mfuOptions, setMfuOptions] = useState([]);
  const [iuOptions, setIuOptions] = useState([]);
  const [ibOptions, setIbOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for table data
  const [assignmentData, setAssignmentData] = useState([
    { 
      mfuCode: '', 
      mfuDesc: '', 
      iuCode: '', 
      iuDesc: '', 
      ibCode: '', 
      ibDesc: '' 
    }
  ]);

  // Fetch options data on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [mfuRes, iuRes, ibRes] = await Promise.all([
          axios.get('http://localhost:3003/api/factory-units'),
          axios.get('http://localhost:5003/api/inventory-units'),
          axios.get('http://localhost:5003/api/inventory-bays')
        ]);
        
        setMfuOptions(mfuRes.data.map(item => ({
          code: item.factoryUnitCode,
          name: item.factoryUnitName || ''
        })));
        
        setIuOptions(iuRes.data.map(item => ({
          code: item.InventoryUnitId,
          name: item.InventoryUnitName || ''
        })));
        
        setIbOptions(ibRes.data.map(item => ({
          code: item.InventoryBayId,
          name: item.InventoryBayName || ''
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

  const handleRemoveRow = (index) => {
    if (assignmentData.length > 1) {
      const newData = assignmentData.filter((_, i) => i !== index);
      setAssignmentData(newData);
    }
  };

  const handleAddRow = () => {
    setAssignmentData([...assignmentData, { 
      mfuCode: '', 
      mfuDesc: '', 
      iuCode: '', 
      iuDesc: '', 
      ibCode: '', 
      ibDesc: '' 
    }]);
  };

  const handleCodeChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
    
    // Update corresponding name based on selected code
    let options, nameField;
    if (field === 'mfuCode') {
      options = mfuOptions;
      nameField = 'mfuDesc';
    } else if (field === 'iuCode') {
      options = iuOptions;
      nameField = 'iuDesc';
    } else if (field === 'ibCode') {
      options = ibOptions;
      nameField = 'ibDesc';
    }
    
    const selectedOption = options.find(opt => opt.code === value);
    newData[index][nameField] = selectedOption ? selectedOption.name : '';
    
    setAssignmentData(newData);
  };

  const handleDescChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
    setAssignmentData(newData);
  };

const handleSave = async () => {
  try {
    // Filter and prepare valid updates only
    const updates = assignmentData
      .filter(row => row.mfuCode && (row.iuCode || row.ibCode))
      .map(row => {
        const updateData = {};
        if (row.iuCode) updateData.InventoryUnitId = row.iuCode;
        if (row.ibCode) updateData.InventoryBayId = row.ibCode;
        return {
          factoryUnitCode: row.mfuCode,
          updateData
        };
      });

    // Check if any valid updates exist
    if (updates.length === 0) {
      alert('Please enter at least one Inventory Unit or Bay for each MFU');
      return;
    }

    // Execute updates
    const savePromises = updates.map(({ factoryUnitCode, updateData }) =>
      axios.put(`http://localhost:3003/api/factory-units/${factoryUnitCode}`, updateData)
    );

    await Promise.all(savePromises);
    alert('Assignments saved successfully!');
    
    // Reset form after successful save
    setAssignmentData([{ 
      mfuCode: '', 
      mfuDesc: '', 
      iuCode: '', 
      iuDesc: '', 
      ibCode: '', 
      ibDesc: '' 
    }]);

  } catch (err) {
    console.error('Save failed:', err);
    alert(`Save failed: ${err.response?.data?.message || err.message}`);
  }
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
        <button onClick={handleBack} className="assignment-cancel-button">
          Cancel
        </button>
        <button onClick={handleSave} className="assignment-save-button">
          Save
        </button>
      </div>

      {/* Assignment Table */}
      <div className="assignment-table-wrapper">
        <table className="assignment-table">
          <thead>
            <tr>
              <th>MFU Code</th>
              <th>MFU Name</th>
              <th>IU Code</th>
              <th>IU Name</th>
              <th>IB Code</th>
              <th>IB Name</th>
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
                    value={assignment.mfuDesc}
                    onChange={(e) => handleDescChange(index, 'mfuDesc', e.target.value)}
                    className="assignment-desc-input"
                    readOnly
                  />
                </td>
                
                {/* IU Code Dropdown */}
                <td>
                  <select
                    value={assignment.iuCode}
                    onChange={(e) => handleCodeChange(index, 'iuCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {iuOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* IU Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.iuDesc}
                    onChange={(e) => handleDescChange(index, 'iuDesc', e.target.value)}
                    className="assignment-desc-input"
                    readOnly
                  />
                </td>
                
                {/* IB Code Dropdown */}
                <td>
                  <select
                    value={assignment.ibCode}
                    onChange={(e) => handleCodeChange(index, 'ibCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {ibOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* IB Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.ibDesc}
                    onChange={(e) => handleDescChange(index, 'ibDesc', e.target.value)}
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
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
            
            {/* Add row button in the last row */}
            <tr>
              <td colSpan="7" className="add-row-cell">
                <button 
                  onClick={handleAddRow} 
                  className="add-row-button"
                  title="Add new row"
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

export default CreateMfuIuIbAssignmentTable;