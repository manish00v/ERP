import { useState } from "react";
import '../BUMFUBE/CreateAssignmentTable/createAssignmentTable.css';

function CreateMfuSuSctAssignmentTable() {
  
  // Sample options data
  const mfuOptions = [
    { code: 'MFU1', name: 'Manufacturing Unit 1' },
    { code: 'MFU2', name: 'Manufacturing Unit 2' },
    { code: 'MFU3', name: 'Manufacturing Unit 3' }
  ];

  const suOptions = [
    { code: 'SU1', name: 'Sourcing Unit 1' },
    { code: 'SU2', name: 'Sourcing Unit 2' },
    { code: 'SU3', name: 'Sourcing Unit 3' }
  ];

  const sctOptions = [
    { code: 'SCT1', name: 'Sourcing Team 1' },
    { code: 'SCT2', name: 'Sourcing Team 2' },
    { code: 'SCT3', name: 'Sourcing Team 3' }
  ];

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

  const handleBack = () => {
    window.history.back();
  };

  const handleRemoveRow = () => {
    if (assignmentData.length > 1) {
      const newData = assignmentData.slice(0, -1);
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
    if (field === 'mfuCode') {
      const selectedMfu = mfuOptions.find(opt => opt.code === value);
      newData[index].mfuDesc = selectedMfu ? selectedMfu.name : '';
    } else if (field === 'suCode') {
      const selectedSu = suOptions.find(opt => opt.code === value);
      newData[index].suDesc = selectedSu ? selectedSu.name : '';
    } else if (field === 'sctCode') {
      const selectedSct = sctOptions.find(opt => opt.code === value);
      newData[index].sctDesc = selectedSct ? selectedSct.name : '';
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
              <th>MFU Code</th>
              <th>MFU name</th>
              <th>SU Code</th>
              <th>SU name</th>
              <th>SCT Code</th>
              <th>SCT name</th>
              
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
                
                {/* MFU name */}
                <td>
                  <input
                    type="text"
                    value={assignment.mfuDesc}
                    onChange={(e) => handleDescChange(index, 'mfuDesc', e.target.value)}
                    className="assignment-desc-input"
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
                
                {/* SU name */}
                <td>
                  <input
                    type="text"
                    value={assignment.suDesc}
                    onChange={(e) => handleDescChange(index, 'suDesc', e.target.value)}
                    className="assignment-desc-input"
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
                
                {/* SCT name */}
                <td>
                  <input
                    type="text"
                    value={assignment.sctDesc}
                    onChange={(e) => handleDescChange(index, 'sctDesc', e.target.value)}
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

export default CreateMfuSuSctAssignmentTable;