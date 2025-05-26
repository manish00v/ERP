import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../BUMFUBE/EditAssignmentTable/EditAssignmentTable.css';

const MfuIuIbManager = () => {
  const navigate = useNavigate();
  
  // Initial state for table data
  const [assignments, setAssignments] = useState([
    {
      mfuCode: 'MFU1',
      mfuDescription: 'Manufacturing Unit 1',
      inventoryUnitCode: 'IU1',
      inventoryUnitDescription: 'Inventory Unit-1',
      inventoryBayCode: 'IB1',
      inventoryBayDescription: 'Inventory Bay-1'
    },
    {
      mfuCode: 'MFU1',
      mfuDescription: 'Manufacturing Unit 1',
      inventoryUnitCode: 'IU1',
      inventoryUnitDescription: 'Inventory Unit-1',
      inventoryBayCode: 'IB2',
      inventoryBayDescription: 'Inventory Bay-2'
    }
  ]);

  // Sample dropdown options
  const mfuOptions = [
    { code: 'MFU1', description: 'Manufacturing Unit 1' },
    { code: 'MFU2', description: 'Manufacturing Unit 2' },
    { code: 'MFU3', description: 'Manufacturing Unit 3' }
  ];

  const inventoryUnitOptions = [
    { code: 'IU1', description: 'Inventory Unit-1' },
    { code: 'IU2', description: 'Inventory Unit-2' },
    { code: 'IU3', description: 'Inventory Unit-3' }
  ];

  const inventoryBayOptions = [
    { code: 'IB1', description: 'Inventory Bay-1' },
    { code: 'IB2', description: 'Inventory Bay-2' },
    { code: 'IB3', description: 'Inventory Bay-3' }
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
      navigate('/MfuIuIb');
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
                <th>Inventory Unit Code</th>
                <th>Inventory Unit Description</th>
                <th>Inventory Bay Code</th>
                <th>Inventory Bay Description</th>
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
                        value={assignment.inventoryUnitCode}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].inventoryUnitCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedIu = inventoryUnitOptions.find(opt => opt.code === e.target.value);
                          if (selectedIu) {
                            updatedAssignments[index].inventoryUnitDescription = selectedIu.description;
                          }
                          setAssignments(updatedAssignments);
                        }}
                      >
                        {inventoryUnitOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.inventoryUnitCode
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.inventoryUnitDescription}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].inventoryUnitDescription = e.target.value;
                          setAssignments(updatedAssignments);
                        }}
                      />
                    ) : (
                      assignment.inventoryUnitDescription
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={assignment.inventoryBayCode}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].inventoryBayCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedIb = inventoryBayOptions.find(opt => opt.code === e.target.value);
                          if (selectedIb) {
                            updatedAssignments[index].inventoryBayDescription = selectedIb.description;
                          }
                          setAssignments(updatedAssignments);
                        }}
                      >
                        {inventoryBayOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.inventoryBayCode
                    )}
                  </td>
                  <td className="description-cell">
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.inventoryBayDescription}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].inventoryBayDescription = e.target.value;
                          setAssignments(updatedAssignments);
                        }}
                      />
                    ) : (
                      assignment.inventoryBayDescription
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

export default MfuIuIbManager;