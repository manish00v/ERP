import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../BUMFUBE/EditAssignmentTable/EditAssignmentTable.css';

const EditMfuDlAssignmentTable = () => {
  const { factoryUnitCode } = useParams();
  const navigate = useNavigate();
  
  // State for assignment data
  const [assignment, setAssignment] = useState({
    factoryUnitCode: '',
    factoryUnitName: '',
    deliveryLocationCode: '',
    deliveryLocationName: ''
  });

  // State for dropdown options
  const [mfuOptions, setMfuOptions] = useState([]);
  const [dlOptions, setDlOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State to track edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dropdown options
        const [mfuRes, dlRes] = await Promise.all([
          axios.get('http://localhost:3003/api/factory-units'),
          axios.get('http://localhost:3003/api/delivery-locations')
        ]);
        
        setMfuOptions(mfuRes.data.map(item => ({
          code: item.factoryUnitCode,
          name: item.factoryUnitName
        })));
        
        setDlOptions(dlRes.data.map(item => ({
          code: item.deliveryLocationCode,
          name: item.deliveryLocationName
        })));
        
        // If editing existing assignment, fetch current data
        if (factoryUnitCode) {
          const mfuRes = await axios.get(`http://localhost:3003/api/factory-units/${factoryUnitCode}`);
          const currentData = mfuRes.data;
          
          setAssignment({
            factoryUnitCode: currentData.factoryUnitCode,
            factoryUnitName: currentData.factoryUnitName,
            deliveryLocationCode: currentData.deliveryLocationCode || '',
            deliveryLocationName: currentData.deliveryLocationName || ''
          });
        }
        
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [factoryUnitCode]);

  // Handler for Edit button
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  // Handler for Save button
  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Prepare data for saving
      const dataToSave = {
        factoryUnitCode: assignment.factoryUnitCode,
        factoryUnitName: assignment.factoryUnitName,
        deliveryLocationCode: assignment.deliveryLocationCode,
        deliveryLocationName: dlOptions.find(dl => dl.code === assignment.deliveryLocationCode)?.name || ''
      };
      
      // Update the factory unit with the delivery location
      await axios.put(
        `http://localhost:3003/api/factory-units/${assignment.factoryUnitCode}`,
        { deliveryLocationCode: assignment.deliveryLocationCode }
      );
      
      setIsEditing(false);
      alert('Changes saved successfully!');
      navigate('/MfuDl');
    } catch (err) {
      console.error('Error saving data:', err);
      alert(`Error saving data: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handler for Cancel button
  const handleCancel = () => {
    if (!isEditing) {
      navigate('/MfuDl');
    } else {
      setIsEditing(false);
      // Reset any unsaved changes by reloading the data
      window.location.reload();
    }
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setAssignment(prev => {
      const updated = {...prev, [field]: value};
      
      // Auto-update names when codes are selected
      if (field === 'factoryUnitCode') {
        const selectedMfu = mfuOptions.find(mfu => mfu.code === value);
        if (selectedMfu) {
          updated.factoryUnitName = selectedMfu.name;
        }
      } else if (field === 'deliveryLocationCode') {
        const selectedDl = dlOptions.find(dl => dl.code === value);
        if (selectedDl) {
          updated.deliveryLocationName = selectedDl.name;
        }
      }
      
      return updated;
    });
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
                <th>MFU Name</th>
                <th>Delivery Location Code</th>
                <th>Delivery Location Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {isEditing ? (
                    <select
                      className="editable-input"
                      value={assignment.factoryUnitCode}
                      onChange={(e) => handleChange('factoryUnitCode', e.target.value)}
                      disabled={!!factoryUnitCode} // Disable if editing existing assignment
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
                <td className="description-cell">
                  {isEditing ? (
                    <input 
                      type="text" 
                      className="editable-input"
                      value={assignment.factoryUnitName}
                      onChange={(e) => handleChange('factoryUnitName', e.target.value)}
                      readOnly // Name is auto-filled when code is selected
                    />
                  ) : (
                    assignment.factoryUnitName
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      className="editable-input"
                      value={assignment.deliveryLocationCode}
                      onChange={(e) => handleChange('deliveryLocationCode', e.target.value)}
                    >
                      <option value="">Select Delivery Location</option>
                      {dlOptions.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.code}
                        </option>
                      ))}
                    </select>
                  ) : (
                    assignment.deliveryLocationCode || 'N/A'
                  )}
                </td>
                <td className="description-cell">
                  {isEditing ? (
                    <input 
                      type="text" 
                      className="editable-input"
                      value={assignment.deliveryLocationName}
                      onChange={(e) => handleChange('deliveryLocationName', e.target.value)}
                      readOnly // Name is auto-filled when code is selected
                    />
                  ) : (
                    assignment.deliveryLocationName || 'N/A'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditMfuDlAssignmentTable;