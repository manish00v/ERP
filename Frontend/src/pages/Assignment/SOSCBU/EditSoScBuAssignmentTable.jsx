import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../BUMFUBE/EditAssignmentTable/EditAssignmentTable.css';

const SoScBuManager = () => {
  const navigate = useNavigate();
  
  // Initial state for table data
  const [relationships, setRelationships] = useState([
    {
      businessUnitCode: 'BU1',
      businessUnitDescription: 'Business unit-1',
      salesChannelCode: 'SC1',
      salesChannelDescription: 'Sales Channel-1',
      salesOfficeCode: 'SO1',
      salesOfficeDescription: 'Sales Office 1',
    },
    {
      businessUnitCode: 'BU2',
      businessUnitDescription: 'Business unit-2',
      salesChannelCode: 'SC1',
      salesChannelDescription: 'Sales Channel-1',
      salesOfficeCode: 'SO1',
      salesOfficeDescription: 'Sales Office 1',
    }
  ]);

  // Sample dropdown options
  const businessUnitOptions = [
    { code: 'BU1', description: 'Business unit-1' },
    { code: 'BU2', description: 'Business unit-2' },
    { code: 'BU3', description: 'Business unit-3' }
  ];

  const salesChannelOptions = [
    { code: 'SC1', description: 'Sales Channel-1' },
    { code: 'SC2', description: 'Sales Channel-2' },
    { code: 'SC3', description: 'Sales Channel-3' }
  ];

  const salesOfficeOptions = [
    { code: 'SO1', description: 'Sales Office 1' },
    { code: 'SO2', description: 'Sales Office 2' },
    { code: 'SO3', description: 'Sales Office 3' }
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
      navigate('/SoScBu');
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
                <th>Business Unit Code</th>
                <th>Business Unit Description</th>
                <th>Sales Channel Code</th>
                <th>Sales Channel Description</th>
                <th>Sales Office Code</th>
                <th>Sales Office Description</th>
              </tr>
            </thead>
            <tbody>
              {relationships.map((relationship, index) => (
                <tr key={index}>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={relationship.businessUnitCode}
                        onChange={(e) => {
                          const updatedRelationships = [...relationships];
                          updatedRelationships[index].businessUnitCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedBu = businessUnitOptions.find(opt => opt.code === e.target.value);
                          if (selectedBu) {
                            updatedRelationships[index].businessUnitDescription = selectedBu.description;
                          }
                          setRelationships(updatedRelationships);
                        }}
                      >
                        {businessUnitOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      relationship.businessUnitCode
                    )}
                  </td>
                  <td className="description-cell">
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={relationship.businessUnitDescription}
                        onChange={(e) => {
                          const updatedRelationships = [...relationships];
                          updatedRelationships[index].businessUnitDescription = e.target.value;
                          setRelationships(updatedRelationships);
                        }}
                      />
                    ) : (
                      relationship.businessUnitDescription
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={relationship.salesChannelCode}
                        onChange={(e) => {
                          const updatedRelationships = [...relationships];
                          updatedRelationships[index].salesChannelCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedSc = salesChannelOptions.find(opt => opt.code === e.target.value);
                          if (selectedSc) {
                            updatedRelationships[index].salesChannelDescription = selectedSc.description;
                          }
                          setRelationships(updatedRelationships);
                        }}
                      >
                        {salesChannelOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      relationship.salesChannelCode
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={relationship.salesChannelDescription}
                        onChange={(e) => {
                          const updatedRelationships = [...relationships];
                          updatedRelationships[index].salesChannelDescription = e.target.value;
                          setRelationships(updatedRelationships);
                        }}
                      />
                    ) : (
                      relationship.salesChannelDescription
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={relationship.salesOfficeCode}
                        onChange={(e) => {
                          const updatedRelationships = [...relationships];
                          updatedRelationships[index].salesOfficeCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedSo = salesOfficeOptions.find(opt => opt.code === e.target.value);
                          if (selectedSo) {
                            updatedRelationships[index].salesOfficeDescription = selectedSo.description;
                          }
                          setRelationships(updatedRelationships);
                        }}
                      >
                        {salesOfficeOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      relationship.salesOfficeCode
                    )}
                  </td>
                  <td className="description-cell">
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={relationship.salesOfficeDescription}
                        onChange={(e) => {
                          const updatedRelationships = [...relationships];
                          updatedRelationships[index].salesOfficeDescription = e.target.value;
                          setRelationships(updatedRelationships);
                        }}
                      />
                    ) : (
                      relationship.salesOfficeDescription
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

export default SoScBuManager;