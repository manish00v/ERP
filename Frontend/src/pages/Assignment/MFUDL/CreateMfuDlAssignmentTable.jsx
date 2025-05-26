import { useState } from "react";
import '../BUMFUBE/CreateAssignmentTable/createAssignmentTable.css';

function CreateMfuDlAssignmentTable() {
  
  // Sample options data
  const mfuOptions = [
    { code: 'MFU1', name: 'Manufacturing Unit 1' },
    { code: 'MFU2', name: 'Manufacturing Unit 2' },
    { code: 'MFU3', name: 'Manufacturing Unit 3' }
  ];

  const dlOptions = [
    { code: 'DL1', name: 'Delivery Location 1' },
    { code: 'DL2', name: 'Delivery Location 2' },
    { code: 'DL3', name: 'Delivery Location 3' }
  ];

  // State for table data
  const [assignmentData, setAssignmentData] = useState([
    { 
      mfuCode: '', 
      mfuDesc: '', 
      dlCode: '', 
      dlDesc: '' 
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
      dlCode: '', 
      dlDesc: '' 
    }]);
  };

  const handleCodeChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
    
    // Update corresponding name based on selected code
    if (field === 'mfuCode') {
      const selectedMfu = mfuOptions.find(opt => opt.code === value);
      newData[index].mfuDesc = selectedMfu ? selectedMfu.name : '';
    } else if (field === 'dlCode') {
      const selectedDl = dlOptions.find(opt => opt.code === value);
      newData[index].dlDesc = selectedDl ? selectedDl.name : '';
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
              <th>DL Code</th>
              <th>DL name</th>
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
                
                {/* DL Code Dropdown */}
                <td>
                  <select
                    value={assignment.dlCode}
                    onChange={(e) => handleCodeChange(index, 'dlCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {dlOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* DL name */}
                <td>
                  <input
                    type="text"
                    value={assignment.dlDesc}
                    onChange={(e) => handleDescChange(index, 'dlDesc', e.target.value)}
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

export default CreateMfuDlAssignmentTable;