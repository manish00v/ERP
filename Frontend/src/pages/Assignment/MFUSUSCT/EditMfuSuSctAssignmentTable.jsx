import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../BUMFUBE/EditAssignmentTable/EditAssignmentTable.css';

const EditMfuSuSctAssignmentTable = () => {
  const { factoryUnitCode } = useParams();
  const navigate = useNavigate();
  
  // State for table data
  const [assignments, setAssignments] = useState([]);
  const [originalAssignments, setOriginalAssignments] = useState([]);

  // State for dropdown options
  const [mfuOptions, setMfuOptions] = useState([]);
  const [SourcingUnitOptions, setSourcingUnitOptions] = useState([]);
  const [SourcingTeamOptions, setSourcingTeamOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to track edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all necessary data in parallel
        const [factoryUnitsRes, SourcingUnitsRes, SourcingTeamsRes, assignmentsRes] = await Promise.all([
          axios.get('http://localhost:3003/api/factory-units'),
          axios.get('http://localhost:5003/api/sourcing-units'),
          axios.get('http://localhost:5003/api/sourcing-teams'),
          factoryUnitCode ? axios.get(`http://localhost:3003/api/factory-units/${factoryUnitCode}`) : Promise.resolve(null)
        ]);

        // Set dropdown options
        setMfuOptions(factoryUnitsRes.data.map(item => ({
          code: item.factoryUnitCode,
          description: item.factoryUnitName
        })));

        setSourcingUnitOptions(SourcingUnitsRes.data.map(item => ({
          code: item.SourcingUnitId,
          description: item.SourcingUnitDesc
        })));

        setSourcingTeamOptions(SourcingTeamsRes.data.map(item => ({
          code: item.SourcingTeamId,
          description: item.SourcingTeamName
        })));

        // Set assignments data
        if (assignmentsRes) {
          const assignmentData = [{
            factoryUnitCode: assignmentsRes.data.factoryUnitCode,
            mfuDescription: assignmentsRes.data.factoryUnitName,
            SourcingUnitCode: assignmentsRes.data.SourcingUnitId || '',
            SourcingUnitDescription: assignmentsRes.data.SourcingUnit?.SourcingUnitDesc || '',
            SourcingTeamCode: assignmentsRes.data.SourcingTeamId || '',
            SourcingTeamDescription: assignmentsRes.data.SourcingTeam?.SourcingTeamName || ''
          }];
          setAssignments(assignmentData);
          setOriginalAssignments(assignmentData);
        } else {
          // Handle case when no specific MFU is provided (view all)
          const allAssignments = factoryUnitsRes.data
            .filter(fu => fu.SourcingUnitId || fu.SourcingTeamId)
            .map(fu => ({
              factoryUnitCode: fu.factoryUnitCode,
              mfuDescription: fu.factoryUnitName,
              SourcingUnitCode: fu.SourcingUnitId || '',
              SourcingUnitDescription: fu.SourcingUnit?.SourcingUnitDesc || '',
              SourcingTeamCode: fu.SourcingTeamId || '',
              SourcingTeamDescription: fu.SourcingTeam?.SourcingTeamName || ''
            }));
          setAssignments(allAssignments);
          setOriginalAssignments(allAssignments);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [factoryUnitCode]);

  // Handler for Edit button
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  // Handler for Save button
  // ... (previous imports and component declaration remain the same)

  // Handler for Save button
  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Prepare update data
      const updatePromises = assignments.map(async (assignment) => {
        const updateData = {};
        
        // Only include fields that have values
        if (assignment.SourcingUnitCode) {
          updateData.SourcingUnitId = assignment.SourcingUnitCode;
        }
        if (assignment.SourcingTeamCode) {
          updateData.SourcingTeamId = assignment.SourcingTeamCode;
        }

        // If no fields to update, skip this assignment
        if (Object.keys(updateData).length === 0) {
          return Promise.resolve();
        }

        return axios.put(
          `http://localhost:3003/api/factory-units/${assignment.factoryUnitCode}`,
          updateData
        );
      });

      // Filter out empty promises
      const validPromises = updatePromises.filter(p => p !== undefined);
      
      if (validPromises.length === 0) {
        alert('No changes to save');
        setIsEditing(false);
        return;
      }

      await Promise.all(validPromises);
      setIsEditing(false);
      setOriginalAssignments([...assignments]);
      alert('Changes saved successfully!');
    } catch (err) {
      console.error('Error saving data:', err);
      alert(`Error saving changes: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

// ... (rest of the component remains the same)
  
  // Handler for Cancel button
  const handleCancel = () => {
    if (!isEditing) {
      navigate('/MfuSuSct');
    } else {
      setIsEditing(false);
      setAssignments([...originalAssignments]);
    }
  };

  // Handler for field changes
  const handleFieldChange = (index, field, value) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index][field] = value;
    
    // Auto-update descriptions when codes are selected
    if (field === 'factoryUnitCode') {
      const selectedMfu = mfuOptions.find(opt => opt.code === value);
      if (selectedMfu) {
        updatedAssignments[index].mfuDescription = selectedMfu.description;
      }
    } else if (field === 'SourcingUnitCode') {
      const selectedSu = SourcingUnitOptions.find(opt => opt.code === value);
      if (selectedSu) {
        updatedAssignments[index].SourcingUnitDescription = selectedSu.description;
      }
    } else if (field === 'SourcingTeamCode') {
      const selectedSct = SourcingTeamOptions.find(opt => opt.code === value);
      if (selectedSct) {
        updatedAssignments[index].SourcingTeamDescription = selectedSct.description;
      }
    }
    
    setAssignments(updatedAssignments);
  };

  if (isLoading) {
    return <div className="business-entity-container">Loading...</div>;
  }

  if (error) {
    return <div className="business-entity-container">Error: {error}</div>;
  }

  return (
    <div className="business-entity-container">
      <div className="business-entity-panel">
        <div className="button-row">
          <div className="left-buttons">
            {!isEditing ? (
              <button onClick={handleEdit} className="edit-button" disabled={isLoading}>
                Edit
              </button>
            ) : (
              <button onClick={handleSave} className="save-button" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            )}
            <button onClick={handleCancel} className="cancel-button" disabled={isLoading}>
              {isEditing ? 'Cancel' : 'Back'}
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
                        value={assignment.factoryUnitCode}
                        onChange={(e) => handleFieldChange(index, 'factoryUnitCode', e.target.value)}
                        disabled={!!factoryUnitCode} // Disable if editing specific MFU
                      >
                        <option value="">Select MFU</option>
                        {mfuOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.factoryUnitCode
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.mfuDescription}
                        onChange={(e) => handleFieldChange(index, 'mfuDescription', e.target.value)}
                      />
                    ) : (
                      assignment.mfuDescription
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={assignment.SourcingUnitCode}
                        onChange={(e) => handleFieldChange(index, 'SourcingUnitCode', e.target.value)}
                      >
                        <option value="">Select Sourcing Unit</option>
                        {SourcingUnitOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.SourcingUnitCode || '-'
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.SourcingUnitDescription}
                        onChange={(e) => handleFieldChange(index, 'SourcingUnitDescription', e.target.value)}
                      />
                    ) : (
                      assignment.SourcingUnitDescription || '-'
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        className="editable-input"
                        value={assignment.SourcingTeamCode}
                        onChange={(e) => handleFieldChange(index, 'SourcingTeamCode', e.target.value)}
                      >
                        <option value="">Select Sourcing Team</option>
                        {SourcingTeamOptions.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      assignment.SourcingTeamCode || '-'
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="editable-input"
                        value={assignment.SourcingTeamDescription}
                        onChange={(e) => handleFieldChange(index, 'SourcingTeamDescription', e.target.value)}
                      />
                    ) : (
                      assignment.SourcingTeamDescription || '-'
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

export default EditMfuSuSctAssignmentTable;