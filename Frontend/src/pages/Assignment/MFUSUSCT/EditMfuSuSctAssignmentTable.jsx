import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../BUMFUBE/EditAssignmentTable/EditAssignmentTable.css';

const MfuSuSctManager = () => {
  const navigate = useNavigate();
  
  // Initial state for table data
  const [assignments, setAssignments] = useState([
    {
      mfuCode: 'MFU1',
      mfuDescription: 'Manufacturing Unit 1',
      sourcingUnitCode: 'SU1',
      sourcingUnitDescription: 'Sourcing Unit-1',
      sourcingTeamCode: 'SCT1',
      sourcingTeamDescription: 'Sourcing Team-1'
    },
    {
      mfuCode: 'MFU1',
      mfuDescription: 'Manufacturing Unit 1',
      sourcingUnitCode: 'SU1',
      sourcingUnitDescription: 'Sourcing Unit-1',
      sourcingTeamCode: 'SCT2',
      sourcingTeamDescription: 'Sourcing Team-2'
    }
  ]);

  // Sample dropdown options
  const mfuOptions = [
    { code: 'MFU1', description: 'Manufacturing Unit 1' },
    { code: 'MFU2', description: 'Manufacturing Unit 2' },
    { code: 'MFU3', description: 'Manufacturing Unit 3' }
  ];

  const sourcingUnitOptions = [
    { code: 'SU1', description: 'Sourcing Unit-1' },
    { code: 'SU2', description: 'Sourcing Unit-2' },
    { code: 'SU3', description: 'Sourcing Unit-3' }
  ];

  const sourcingTeamOptions = [
    { code: 'SCT1', description: 'Sourcing Team-1' },
    { code: 'SCT2', description: 'Sourcing Team-2' },
    { code: 'SCT3', description: 'Sourcing Team-3' }
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
      navigate('/MfuSuSct');
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
                <th>MFU Code</th>
                <th>MFU Description</th>
                <th>Sourcing Unit Code</th>
                <th>Sourcing Unit Description</th>
                <th>Sourcing Team Code</th>
                <th>Sourcing Team Description</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={index}>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={assignment.mfuCode}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].mfuCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedMfu = mfuOptions.find(opt => opt.code === e.target.value);
                          if (selectedMfu) {
                            updatedAssignments[index].mfuDescription = selectedMfu.description;
                          }
                          setAssignments(updatedAssignments);
                        }}
                      >
                        {mfuOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.mfuCode
                    )}
                  </td>
                  <td className="description-cell">
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.mfuDescription}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].mfuDescription = e.target.value;
                          setAssignments(updatedAssignments);
                        }}
                      />
                    ) : (
                      assignment.mfuDescription
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={assignment.sourcingUnitCode}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].sourcingUnitCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedSu = sourcingUnitOptions.find(opt => opt.code === e.target.value);
                          if (selectedSu) {
                            updatedAssignments[index].sourcingUnitDescription = selectedSu.description;
                          }
                          setAssignments(updatedAssignments);
                        }}
                      >
                        {sourcingUnitOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.sourcingUnitCode
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.sourcingUnitDescription}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].sourcingUnitDescription = e.target.value;
                          setAssignments(updatedAssignments);
                        }}
                      />
                    ) : (
                      assignment.sourcingUnitDescription
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={assignment.sourcingTeamCode}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].sourcingTeamCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedSct = sourcingTeamOptions.find(opt => opt.code === e.target.value);
                          if (selectedSct) {
                            updatedAssignments[index].sourcingTeamDescription = selectedSct.description;
                          }
                          setAssignments(updatedAssignments);
                        }}
                      >
                        {sourcingTeamOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.sourcingTeamCode
                    )}
                  </td>
                  <td className="description-cell">
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.sourcingTeamDescription}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].sourcingTeamDescription = e.target.value;
                          setAssignments(updatedAssignments);
                        }}
                      />
                    ) : (
                      assignment.sourcingTeamDescription
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

export default MfuSuSctManager;