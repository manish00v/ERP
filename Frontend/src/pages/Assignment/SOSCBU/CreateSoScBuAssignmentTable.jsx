import { useState } from "react";
import '../BUMFUBE/CreateAssignmentTable/createAssignmentTable.css';

function CreateSoScBuAssignmentTable() {
  
  // Sample options data
  const buOptions = [
    { code: 'BU1', name: 'Business Unit 1' },
    { code: 'BU2', name: 'Business Unit 2' },
    { code: 'BU3', name: 'Business Unit 3' }
  ];

  const scOptions = [
    { code: 'SC1', name: 'Sales Channel 1' },
    { code: 'SC2', name: 'Sales Channel 2' },
    { code: 'SC3', name: 'Sales Channel 3' }
  ];

  const soOptions = [
    { code: 'SO1', name: 'Sales Office 1' },
    { code: 'SO2', name: 'Sales Office 2' },
    { code: 'SO3', name: 'Sales Office 3' }
  ];

  // State for table data
  const [assignmentData, setAssignmentData] = useState([
    { 
      businessUnitCode: '', 
      businessUnitDesc: '', 
      salesChannelCode: '', 
      salesChannelDesc: '', 
      salesOfficeCode: '', 
      salesOfficeDesc: '' 
    }
  ]);

  const handleBack = () => {
    window.history.back();
  };

  const handleSave = () => {
    console.log('Saved data:', assignmentData);
    // Here you would typically send the data to your backend
    alert('Data saved successfully!');
  };

  const handleRemoveRow = () => {
    if (assignmentData.length > 1) {
      const newData = assignmentData.slice(0, -1);
      setAssignmentData(newData);
    }
  };

  const handleAddRow = () => {
    setAssignmentData([...assignmentData, { 
      businessUnitCode: '', 
      businessUnitDesc: '', 
      salesChannelCode: '', 
      salesChannelDesc: '', 
      salesOfficeCode: '', 
      salesOfficeDesc: '' 
    }]);
  };

  const handleCodeChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
    
    // Update corresponding name based on selected code
    if (field === 'businessUnitCode') {
      const selectedBu = buOptions.find(opt => opt.code === value);
      newData[index].businessUnitDesc = selectedBu ? selectedBu.name : '';
    } else if (field === 'salesChannelCode') {
      const selectedSc = scOptions.find(opt => opt.code === value);
      newData[index].salesChannelDesc = selectedSc ? selectedSc.name : '';
    } else if (field === 'salesOfficeCode') {
      const selectedSo = soOptions.find(opt => opt.code === value);
      newData[index].salesOfficeDesc = selectedSo ? selectedSo.name : '';
    }
    
    setAssignmentData(newData);
  };

  const handleDescChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
    setAssignmentData(newData);
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
              <th>Business Unit Code</th>
              <th>Business Unit Name</th>
              <th>Sales Channel Code</th>
              <th>Sales Channel Name</th>
              <th>Sales Office Code</th>
              <th>Sales Office Name</th>
             
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
                  />
                </td>
                
                {/* Sales Channel Code Dropdown */}
                <td>
                  <select
                    value={assignment.salesChannelCode}
                    onChange={(e) => handleCodeChange(index, 'salesChannelCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {scOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* Sales Channel Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.salesChannelDesc}
                    onChange={(e) => handleDescChange(index, 'salesChannelDesc', e.target.value)}
                    className="assignment-desc-input"
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

export default CreateSoScBuAssignmentTable;