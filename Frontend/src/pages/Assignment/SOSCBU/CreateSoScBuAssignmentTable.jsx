import { useState, useEffect } from "react";
import axios from 'axios';
import '../BUMFUBE/CreateAssignmentTable/createAssignmentTable.css';

function CreateSoScBuAssignmentTable() {
  // State for options data
  const [buOptions, setBuOptions] = useState([]);
  const [scOptions, setScOptions] = useState([]);
  const [soOptions, setSoOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for table data
  const [assignmentData, setAssignmentData] = useState([
    { 
      businessUnitCode: '', 
      businessUnitDesc: '', 
      salesChannelId: '', 
      salesChannelName: '', 
      salesOfficeCode: '', 
      salesOfficeDesc: '' 
    }
  ]);

  // Fetch options data on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [buRes, scRes, soRes] = await Promise.all([
          axios.get('http://localhost:3003/api/business-units'),
          axios.get('http://localhost:3003/api/sales-channels'),
          axios.get('http://localhost:3003/api/sales-offices')
        ]);
        
        setBuOptions(buRes.data.map(item => ({
          code: item.businessUnitCode,
          name: item.businessUnitDesc || ''
        })));
        
        setScOptions(scRes.data.map(item => ({
          id: item.salesChannelId,
          name: item.salesChannelName || ''
        })));
        
        setSoOptions(soRes.data.map(item => ({
          code: item.salesOfficeCode,
          name: item.salesOfficeDesc || ''
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
      // Show saving alert
      alert('Saving your changes...');
      
      // Prepare and send updates for each assignment
      const savePromises = assignmentData
        .filter(row => row.businessUnitCode && (row.salesChannelId || row.salesOfficeCode))
        .map(async (row) => {
          const updateData = {
            salesChannelId: row.salesChannelId || null,
            salesOfficeCode: row.salesOfficeCode || null
          };

          // Only include fields that have values
          Object.keys(updateData).forEach(key => {
            if (updateData[key] === null) {
              delete updateData[key];
            }
          });

          return axios.put(
            `http://localhost:3003/api/business-units/${row.businessUnitCode}`,
            updateData
          );
        });

      await Promise.all(savePromises);
      // Show success alert
      alert('Your changes have been saved successfully!');
    } catch (err) {
      console.error('Error saving assignments:', err);
      // Show error alert
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleRemoveRow = (index) => {
    if (assignmentData.length > 1) {
      const newData = assignmentData.filter((_, i) => i !== index);
      setAssignmentData(newData);
    }
  };

  const handleAddRow = () => {
    setAssignmentData([...assignmentData, { 
      businessUnitCode: '', 
      businessUnitDesc: '', 
      salesChannelId: '', 
      salesChannelName: '', 
      salesOfficeCode: '', 
      salesOfficeDesc: '' 
    }]);
  };

  const handleCodeChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
    
    // Update corresponding name based on selected code
    let options, nameField;
    if (field === 'businessUnitCode') {
      options = buOptions;
      nameField = 'businessUnitDesc';
    } else if (field === 'salesChannelId') {
      options = scOptions;
      nameField = 'salesChannelName';
    } else if (field === 'salesOfficeCode') {
      options = soOptions;
      nameField = 'salesOfficeDesc';
    }
    
    const selectedOption = options.find(opt => 
      field === 'salesChannelId' ? opt.id === value : opt.code === value
    );
    newData[index][nameField] = selectedOption ? selectedOption.name : '';
    
    setAssignmentData(newData);
  };

  const handleDescChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
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
              <th>Business Unit Code</th>
              <th>Business Unit Name</th>
              <th>Sales Channel</th>
              <th>Sales Channel Name</th>
              <th>Sales Office Code</th>
              <th>Sales Office Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignmentData.map((assignment, index) => (
              <tr key={index}>
                {/* Business Unit Code Dropdown */}
                <td>
                  <select
                    value={assignment.businessUnitCode}
                    onChange={(e) => handleCodeChange(index, 'businessUnitCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {buOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* Business Unit Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.businessUnitDesc}
                    onChange={(e) => handleDescChange(index, 'businessUnitDesc', e.target.value)}
                    className="assignment-desc-input"
                    readOnly
                  />
                </td>
                
                {/* Sales Channel Dropdown */}
                <td>
                  <select
                    value={assignment.salesChannelId}
                    onChange={(e) => handleCodeChange(index, 'salesChannelId', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {scOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.id}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* Sales Channel Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.salesChannelName}
                    onChange={(e) => handleDescChange(index, 'salesChannelName', e.target.value)}
                    className="assignment-desc-input"
                    readOnly
                  />
                </td>
                
                {/* Sales Office Code Dropdown */}
                <td>
                  <select
                    value={assignment.salesOfficeCode}
                    onChange={(e) => handleCodeChange(index, 'salesOfficeCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {soOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* Sales Office Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.salesOfficeDesc}
                    onChange={(e) => handleDescChange(index, 'salesOfficeDesc', e.target.value)}
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

export default CreateSoScBuAssignmentTable;