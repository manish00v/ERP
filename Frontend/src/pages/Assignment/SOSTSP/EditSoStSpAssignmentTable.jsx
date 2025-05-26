import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../BUMFUBE/EditAssignmentTable/EditAssignmentTable.css';

const SpStSoManager = () => {
  const navigate = useNavigate();
  
  // Initial state for table data
  const [assignments, setAssignments] = useState([
    {
      salesOfficeCode: 'SO1',
      salesOfficeDescription: 'Sales Office 1',
      salesTeamCode: 'ST1',
      salesTeamDescription: 'Sales Team-1',
      salesPersonCode: 'SP1',
      salesPersonDescription: 'Sales Person-1'
    },
    {
      salesOfficeCode: 'SO1',
      salesOfficeDescription: 'Sales Office 1',
      salesTeamCode: 'ST1',
      salesTeamDescription: 'Sales Team-1',
      salesPersonCode: 'SP2',
      salesPersonDescription: 'Sales Person-2'
    }
  ]);

  // Sample dropdown options
  const salesOfficeOptions = [
    { code: 'SO1', description: 'Sales Office 1' },
    { code: 'SO2', description: 'Sales Office 2' },
    { code: 'SO3', description: 'Sales Office 3' }
  ];

  const salesTeamOptions = [
    { code: 'ST1', description: 'Sales Team-1' },
    { code: 'ST2', description: 'Sales Team-2' },
    { code: 'ST3', description: 'Sales Team-3' }
  ];

  const salesPersonOptions = [
    { code: 'SP1', description: 'Sales Person-1' },
    { code: 'SP2', description: 'Sales Person-2' },
    { code: 'SP3', description: 'Sales Person-3' }
  ];

  // State to track edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // Handler for Edit button
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  // Handler for Save button
  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to a backend
    alert('Changes saved successfully!');
  };
  
  // Handler for Cancel button
  const handleCancel = () => {
    if (!isEditing) {
      // When not in edit mode (paired with Edit button), navigate back
      navigate('/SoStSp');
    } else {
      // When in edit mode (paired with Save button), just cancel editing
      setIsEditing(false);
      // You might want to reset any unsaved changes here
    }
  };


  return (
    <div className="business-entity-container">
      <div className="business-entity-panel">
        <div className="button-row">
          <div className="left-buttons">
            {!isEditing ? (
              <button onClick={handleEdit} className="edit-button">
                Edit
              </button>
            ) : (
              <button onClick={handleSave} className="save-button">
                Save
              </button>
            )}
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="entity-table">
            <thead>
              <tr>
                <th>Sales Office Code</th>
                <th>Sales Office Description</th>
                <th>Sales Team Code</th>
                <th>Sales Team Description</th>
                <th>Sales Person Code</th>
                <th>Sales Person Description</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={index}>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={assignment.salesOfficeCode}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].salesOfficeCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedSo = salesOfficeOptions.find(opt => opt.code === e.target.value);
                          if (selectedSo) {
                            updatedAssignments[index].salesOfficeDescription = selectedSo.description;
                          }
                          setAssignments(updatedAssignments);
                        }}
                      >
                        {salesOfficeOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.salesOfficeCode
                    )}
                  </td>
                  <td className="description-cell">
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.salesOfficeDescription}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].salesOfficeDescription = e.target.value;
                          setAssignments(updatedAssignments);
                        }}
                      />
                    ) : (
                      assignment.salesOfficeDescription
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={assignment.salesTeamCode}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].salesTeamCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedSt = salesTeamOptions.find(opt => opt.code === e.target.value);
                          if (selectedSt) {
                            updatedAssignments[index].salesTeamDescription = selectedSt.description;
                          }
                          setAssignments(updatedAssignments);
                        }}
                      >
                        {salesTeamOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.salesTeamCode
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.salesTeamDescription}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].salesTeamDescription = e.target.value;
                          setAssignments(updatedAssignments);
                        }}
                      />
                    ) : (
                      assignment.salesTeamDescription
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={assignment.salesPersonCode}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].salesPersonCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedSp = salesPersonOptions.find(opt => opt.code === e.target.value);
                          if (selectedSp) {
                            updatedAssignments[index].salesPersonDescription = selectedSp.description;
                          }
                          setAssignments(updatedAssignments);
                        }}
                      >
                        {salesPersonOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.salesPersonCode
                    )}
                  </td>
                  <td className="description-cell">
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.salesPersonDescription}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].salesPersonDescription = e.target.value;
                          setAssignments(updatedAssignments);
                        }}
                      />
                    ) : (
                      assignment.salesPersonDescription
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpStSoManager;