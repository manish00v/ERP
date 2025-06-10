import { useState, useEffect } from "react";
import axios from 'axios';
import '../BUMFUBE/CreateAssignmentTable/createAssignmentTable.css';

function CreateMfuSuSctAssignmentTable() {
  // State for options data
  const [mfuOptions, setMfuOptions] = useState([]);
  const [suOptions, setSuOptions] = useState([]);
  const [sctOptions, setSctOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for table data
  const [assignmentData, setAssignmentData] = useState([
    { 
      mfuCode: '', 
      mfuDesc: '', 
      suCode: '', 
      suDesc: '', 
      sctCode: '', 
      sctDesc: '' 
    }
  ]);

  // Fetch options data on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [mfuRes, suRes, sctRes] = await Promise.all([
          axios.get('http://localhost:3003/api/factory-units'),
          axios.get('http://localhost:5003/api/sourcing-units'),
          axios.get('http://localhost:5003/api/sourcing-teams')
        ]);
        
        setMfuOptions(mfuRes.data.map(item => ({
          code: item.factoryUnitCode,
          name: item.factoryUnitName || ''
        })));
        
        setSuOptions(suRes.data.map(item => ({
          code: item.SourcingUnitId,  // Changed from sourcingUnitCode to sourcingUnitId
          name: item.SourcingUnitDesc || ''
        })));
        
        setSctOptions(sctRes.data.map(item => ({
          code: item.SourcingTeamId,  // Changed from sourcingTeamCode to sourcingTeamId
          name: item.SourcingTeamName || ''
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
      suCode: '', 
      suDesc: '', 
      sctCode: '', 
      sctDesc: '' 
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
    } else if (field === 'suCode') {
      options = suOptions;
      nameField = 'suDesc';
    } else if (field === 'sctCode') {
      options = sctOptions;
      nameField = 'sctDesc';
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
      // Prepare data for API
      const saveData = assignmentData
        .filter(row => row.mfuCode && (row.suCode || row.sctCode))
        .map(row => ({
          factoryUnitCode: row.mfuCode,
          sourcingUnitId: row.suCode || null,  // Changed to sourcingUnitId
          sourcingTeamId: row.sctCode || null  // Changed to sourcingTeamId
        }));

      // Send data to backend
      const savePromises = saveData.map(data => 
        axios.put(`http://localhost:3003/api/factory-units/${data.factoryUnitCode}`, {
          sourcingUnitId: data.sourcingUnitId,
          sourcingTeamId: data.sourcingTeamId
        })
      );

      await Promise.all(savePromises);
      alert('Assignments saved successfully!');
    } catch (err) {
      console.error('Error saving assignments:', err);
      alert(`Error: ${err.response?.data?.message || err.message}`);
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
              <th>SU Code</th>
              <th>SU Name</th>
              <th>SCT Code</th>
              <th>SCT Name</th>
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
                
                {/* SU Code Dropdown */}
                <td>
                  <select
                    value={assignment.suCode}
                    onChange={(e) => handleCodeChange(index, 'suCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {suOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* SU Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.suDesc}
                    onChange={(e) => handleDescChange(index, 'suDesc', e.target.value)}
                    className="assignment-desc-input"
                    readOnly
                  />
                </td>
                
                {/* SCT Code Dropdown */}
                <td>
                  <select
                    value={assignment.sctCode}
                    onChange={(e) => handleCodeChange(index, 'sctCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {sctOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* SCT Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.sctDesc}
                    onChange={(e) => handleDescChange(index, 'sctDesc', e.target.value)}
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

export default CreateMfuSuSctAssignmentTable;