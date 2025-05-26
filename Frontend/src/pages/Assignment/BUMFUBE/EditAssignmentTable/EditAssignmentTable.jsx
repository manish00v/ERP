import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditAssignmentTable.css';

const BusinessEntityManager = () => {
  const navigate = useNavigate();
  
  // Initial state for table data
  const [entities, setEntities] = useState([
    {
      businessEntityCode: 'BE01',
      businessEntityName: 'Business Entity 1',
      mfuCode: 'MFU1',
      mfuDescription: 'Manufacturing Unit-1',
      businessUnitCode: 'BU1',
      businessUnitName: 'Business unit-1'
    },

  ]);

  // Sample dropdown options
  const mfuOptions = [
    { code: 'MFU1', description: 'Manufacturing Unit-1' },
    { code: 'MFU2', description: 'Manufacturing Unit-2' },
    { code: 'MFU3', description: 'Manufacturing Unit-3' }
  ];

  const businessUnitOptions = [
    { code: 'BU1', name: 'Business unit-1' },
    { code: 'BU2', name: 'Business unit-2' },
    { code: 'BU3', name: 'Business unit-3' }
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
      navigate('/BUMFUBE');
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
          <div className="right-buttons">
          </div>
        </div>
        
        <div className="table-container">
          <table className="entity-table">
            <thead>
              <tr>
                <th>Business Entity Code</th>
                <th>Business Entity name</th>
                <th>MFU Code</th>
                <th>MFU name</th>
                <th>Business unit code</th>
                <th>Business Unit name</th>
              </tr>
            </thead>
            <tbody>
              {entities.map((entity, index) => (
                <tr key={index}>
                  <td>
                    {entity.businessEntityCode}
                  </td>
                  <td className="name-cell">
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={entity.businessEntityName}
                        onChange={(e) => {
                          const updatedEntities = [...entities];
                          updatedEntities[index].businessEntityName = e.target.value;
                          setEntities(updatedEntities);
                        }}
                      />
                    ) : (
                      entity.businessEntityName
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={entity.mfuCode}
                        onChange={(e) => {
                          const updatedEntities = [...entities];
                          updatedEntities[index].mfuCode = e.target.value;
                          // Auto-fill description when code is selected
                          const selectedMfu = mfuOptions.find(opt => opt.code === e.target.value);
                          if (selectedMfu) {
                            updatedEntities[index].mfuDescription = selectedMfu.description;
                          }
                          setEntities(updatedEntities);
                        }}
                      >
                        {mfuOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      entity.mfuCode
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={entity.mfuDescription}
                        onChange={(e) => {
                          const updatedEntities = [...entities];
                          updatedEntities[index].mfuDescription = e.target.value;
                          setEntities(updatedEntities);
                        }}
                      />
                    ) : (
                      entity.mfuDescription
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={entity.businessUnitCode}
                        onChange={(e) => {
                          const updatedEntities = [...entities];
                          updatedEntities[index].businessUnitCode = e.target.value;
                          // Auto-fill name when code is selected
                          const selectedBu = businessUnitOptions.find(opt => opt.code === e.target.value);
                          if (selectedBu) {
                            updatedEntities[index].businessUnitName = selectedBu.name;
                          }
                          setEntities(updatedEntities);
                        }}
                      >
                        {businessUnitOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      entity.businessUnitCode
                    )}
                  </td>
                  <td className="name-cell">
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={entity.businessUnitName}
                        onChange={(e) => {
                          const updatedEntities = [...entities];
                          updatedEntities[index].businessUnitName = e.target.value;
                          setEntities(updatedEntities);
                        }}
                      />
                    ) : (
                      entity.businessUnitName
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

export default BusinessEntityManager;