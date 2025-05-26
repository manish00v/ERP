import { useState } from "react";
import './createAssignmentTable.css';

function CreateAssignmentTable() {
  
  // Sample options data
  const businessEntityOptions = [
    { code: 'BE1', name: 'Business Entity 1' },
    { code: 'BE2', name: 'Business Entity 2' },
    { code: 'BE3', name: 'Business Entity 3' }
  ];

  const mfuOptions = [
    { code: 'MFU1', name: 'Manufacturing Unit 1' },
    { code: 'MFU2', name: 'Manufacturing Unit 2' },
    { code: 'MFU3', name: 'Manufacturing Unit 3' }
  ];

  const businessUnitOptions = [
    { code: 'BU1', name: 'Business Unit 1' },
    { code: 'BU2', name: 'Business Unit 2' },
    { code: 'BU3', name: 'Business Unit 3' }
  ];

  // State for table data
  const [assignmentData, setAssignmentData] = useState([
    { 
      businessEntityCode: '', 
      businessEntityDesc: '', 
      mfuCode: '', 
      mfuDesc: '', 
      businessUnitCode: '', 
      businessUnitDesc: '' 
    }
  ]);

  const handleBack = () => {
    window.history.back();
  };

  const handleAddRow = () => {
    setAssignmentData([...assignmentData, { 
      businessEntityCode: '', 
      businessEntityDesc: '', 
      mfuCode: '', 
      mfuDesc: '', 
      businessUnitCode: '', 
      businessUnitDesc: '' 
    }]);
  };

  const handleRemoveRow = () => {
    if (assignmentData.length > 1) {
      const newData = assignmentData.slice(0, -1);
      setAssignmentData(newData);
    }
  };

  const handleCodeChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
    
    // Update corresponding name based on selected code
    if (field === 'businessEntityCode') {
      const selectedEntity = businessEntityOptions.find(opt => opt.code === value);
      newData[index].businessEntityDesc = selectedEntity ? selectedEntity.name : '';
    } else if (field === 'mfuCode') {
      const selectedMfu = mfuOptions.find(opt => opt.code === value);
      newData[index].mfuDesc = selectedMfu ? selectedMfu.name : '';
    } else if (field === 'businessUnitCode') {
      const selectedBu = businessUnitOptions.find(opt => opt.code === value);
      newData[index].businessUnitDesc = selectedBu ? selectedBu.name : '';
    }
    
    setAssignmentData(newData);
  };

  const handleDescChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
    setAssignmentData(newData);
  };

  const handleSave = () => {
    console.log('Saved data:', assignmentData);
    // Here you would typically send the data to your backend
    alert('Data saved successfully!');
  };

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
              <th>Business Entity Code</th>
              <th>Business Entity name</th>
              <th>MFU Code</th>
              <th>MFU name</th>
              <th>Business Unit Code</th>
              <th>Business Unit name</th>
            </tr>
          </thead>
          <tbody>
            {assignmentData.map((assignment, index) => (
              <tr key={index}>
                {/* Business Entity Code Dropdown */}
                <td>
                  <select
                    value={assignment.businessEntityCode}
                    onChange={(e) => handleCodeChange(index, 'businessEntityCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {businessEntityOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* Business Entity name */}
                <td>
                  <input
                    type="text"
                    value={assignment.businessEntityDesc}
                    onChange={(e) => handleDescChange(index, 'businessEntityDesc', e.target.value)}
                    className="assignment-desc-input"
                  />
                </td>
                
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
                
                {/* MFU name */}
                <td>
                  <input
                    type="text"
                    value={assignment.mfuDesc}
                    onChange={(e) => handleDescChange(index, 'mfuDesc', e.target.value)}
                    className="assignment-desc-input"
                  />
                </td>
                
                {/* Business Unit Code Dropdown */}
                <td>
                  <select
                    value={assignment.businessUnitCode}
                    onChange={(e) => handleCodeChange(index, 'businessUnitCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {businessUnitOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* Business Unit name */}
                <td>
                  <input
                    type="text"
                    value={assignment.businessUnitDesc}
                    onChange={(e) => handleDescChange(index, 'businessUnitDesc', e.target.value)}
                    className="assignment-desc-input"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Action buttons container */}
        <div className="table-action-buttons">
          <button 
            onClick={handleRemoveRow} 
            className="remove-row-button"
            disabled={assignmentData.length <= 1}
            title="Remove last row"
          >
            -
          </button>
          <button 
            onClick={handleAddRow} 
            className="add-row-button"
            title="Add new row"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAssignmentTable;