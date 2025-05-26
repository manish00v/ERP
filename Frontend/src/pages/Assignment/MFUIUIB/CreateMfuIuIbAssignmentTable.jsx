import { useState } from "react";
import '../BUMFUBE/CreateAssignmentTable/createAssignmentTable.css';

function CreateMfuIuIbAssignmentTable() {
  
  // Sample options data
  const mfuOptions = [
    { code: 'MFU1', name: 'Manufacturing Unit 1' },
    { code: 'MFU2', name: 'Manufacturing Unit 2' },
    { code: 'MFU3', name: 'Manufacturing Unit 3' }
  ];

  const iuOptions = [
    { code: 'IU1', name: 'Inventory Unit 1' },
    { code: 'IU2', name: 'Inventory Unit 2' },
    { code: 'IU3', name: 'Inventory Unit 3' }
  ];

  const ibOptions = [
    { code: 'IB1', name: 'Inventory Bay 1' },
    { code: 'IB2', name: 'Inventory Bay 2' },
    { code: 'IB3', name: 'Inventory Bay 3' }
  ];

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
    if (field === 'mfuCode') {
      const selectedMfu = mfuOptions.find(opt => opt.code === value);
      newData[index].mfuDesc = selectedMfu ? selectedMfu.name : '';
    } else if (field === 'iuCode') {
      const selectedIu = iuOptions.find(opt => opt.code === value);
      newData[index].iuDesc = selectedIu ? selectedIu.name : '';
    } else if (field === 'ibCode') {
      const selectedIb = ibOptions.find(opt => opt.code === value);
      newData[index].ibDesc = selectedIb ? selectedIb.name : '';
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
              <th>IU Code</th>
              <th>IU name</th>
              <th>IB Code</th>
              <th>IB name</th>
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
                
                {/* IU name */}
                <td>
                  <input
                    type="text"
                    value={assignment.iuDesc}
                    onChange={(e) => handleDescChange(index, 'iuDesc', e.target.value)}
                    className="assignment-desc-input"
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
                
                {/* IB name */}
                <td>
                  <input
                    type="text"
                    value={assignment.ibDesc}
                    onChange={(e) => handleDescChange(index, 'ibDesc', e.target.value)}
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

export default CreateMfuIuIbAssignmentTable;