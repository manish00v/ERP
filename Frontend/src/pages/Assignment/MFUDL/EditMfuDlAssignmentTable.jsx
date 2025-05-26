import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../BUMFUBE/EditAssignmentTable/EditAssignmentTable.css';

const MfuDlManager = () => {
  const navigate = useNavigate();
  
  // Initial state for table data
  const [assignments, setAssignments] = useState([
    {
      mfuCode: 'MFU1',
      mfuDescription: 'Manufacturing Unit 1',
      deliveryLocationCode: 'DL1',
      deliveryLocationDescription: 'Delivery Location-1',
    },
    {
      mfuCode: 'MFU1',
      mfuDescription: 'Manufacturing Unit 1',
      deliveryLocationCode: 'DL2',
      deliveryLocationDescription: 'Delivery Location-2',
    }
  ]);

  // Sample dropdown options
  const mfuOptions = [
    { code: 'MFU1', description: 'Manufacturing Unit 1' },
    { code: 'MFU2', description: 'Manufacturing Unit 2' },
    { code: 'MFU3', description: 'Manufacturing Unit 3' }
  ];

  const deliveryLocationOptions = [
    { code: 'DL1', description: 'Delivery Location-1' },
    { code: 'DL2', description: 'Delivery Location-2' },
    { code: 'DL3', description: 'Delivery Location-3' }
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
      navigate('/MfuDl');
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
                <th>Delivery Location Code</th>
                <th>Delivery Location Description</th>
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
                        value={assignment.deliveryLocationCode}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].deliveryLocationCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedDl = deliveryLocationOptions.find(opt => opt.code === e.target.value);
                          if (selectedDl) {
                            updatedAssignments[index].deliveryLocationDescription = selectedDl.description;
                          }
                          setAssignments(updatedAssignments);
                        }}
                      >
                        {deliveryLocationOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.deliveryLocationCode
                    )}
                  </td>
                  <td className="description-cell">
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.deliveryLocationDescription}
                        onChange={(e) => {
                          const updatedAssignments = [...assignments];
                          updatedAssignments[index].deliveryLocationDescription = e.target.value;
                          setAssignments(updatedAssignments);
                        }}
                      />
                    ) : (
                      assignment.deliveryLocationDescription
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

export default MfuDlManager;