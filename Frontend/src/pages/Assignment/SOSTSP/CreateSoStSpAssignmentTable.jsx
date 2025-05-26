import { useState } from "react";
import '../BUMFUBE/CreateAssignmentTable/createAssignmentTable.css';

function CreateSpStSoAssignmentTable() {
  
  // Sample options data
  const spOptions = [
    { code: 'SP1', name: 'John Doe' },
    { code: 'SP2', name: 'Jane Smith' },
    { code: 'SP3', name: 'Mike Johnson' }
  ];

  const stOptions = [
    { code: 'ST1', name: 'Sales Team 1' },
    { code: 'ST2', name: 'Sales Team 2' },
    { code: 'ST3', name: 'Sales Team 3' }
  ];

  const soOptions = [
    { code: 'SO1', name: 'Sales Office 1' },
    { code: 'SO2', name: 'Sales Office 2' },
    { code: 'SO3', name: 'Sales Office 3' }
  ];

  // State for table data
  const [assignmentData, setAssignmentData] = useState([
    { 
      salesPersonCode: '', 
      salesPersonDesc: '', 
      salesTeamCode: '', 
      salesTeamDesc: '', 
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
      salesPersonCode: '', 
      salesPersonDesc: '', 
      salesTeamCode: '', 
      salesTeamDesc: '', 
      salesOfficeCode: '', 
      salesOfficeDesc: '' 
    }]);
  };

  const handleCodeChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
    
    // Update corresponding name based on selected code
    if (field === 'salesPersonCode') {
      const selectedSp = spOptions.find(opt => opt.code === value);
      newData[index].salesPersonDesc = selectedSp ? selectedSp.name : '';
    } else if (field === 'salesTeamCode') {
      const selectedSt = stOptions.find(opt => opt.code === value);
      newData[index].salesTeamDesc = selectedSt ? selectedSt.name : '';
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
              <th>Sales Person Code</th>
              <th>Sales Person Name</th>
              <th>Sales Team Code</th>
              <th>Sales Team Name</th>
              <th>Sales Office Code</th>
              <th>Sales Office Name</th>
              
            </tr>
          </thead>
          <tbody>
            {assignmentData.map((assignment, index) => (
              <tr key={index}>
                {/* Sales Person Code Dropdown */}
                <td>
                  <select
                    value={assignment.salesPersonCode}
                    onChange={(e) => handleCodeChange(index, 'salesPersonCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {spOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* Sales Person Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.salesPersonDesc}
                    onChange={(e) => handleDescChange(index, 'salesPersonDesc', e.target.value)}
                    className="assignment-desc-input"
                  />
                </td>
                
                {/* Sales Team Code Dropdown */}
                <td>
                  <select
                    value={assignment.salesTeamCode}
                    onChange={(e) => handleCodeChange(index, 'salesTeamCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {stOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>
                
                {/* Sales Team Name */}
                <td>
                  <input
                    type="text"
                    value={assignment.salesTeamDesc}
                    onChange={(e) => handleDescChange(index, 'salesTeamDesc', e.target.value)}
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

export default CreateSpStSoAssignmentTable;