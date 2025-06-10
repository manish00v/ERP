import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../BUMFUBE/EditAssignmentTable/EditAssignmentTable.css';

const MfuIuIbManager = () => {
  const navigate = useNavigate();
  const { factoryUnitCode } = useParams();
  
  const [assignment, setAssignment] = useState({
    mfuCode: '',
    mfuDescription: '',
    InventoryUnitCode: '',
    InventoryUnitDescription: '',
    InventoryBayCode: '',
    InventoryBayDescription: ''
  });

  const [mfuOptions, setMfuOptions] = useState([]);
  const [InventoryUnitOptions, setInventoryUnitOptions] = useState([]);
  const [InventoryBayOptions, setInventoryBayOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dropdown options
        const [mfuRes, iuRes, ibRes] = await Promise.all([
          axios.get('http://localhost:3003/api/factory-units'),
          axios.get('http://localhost:5003/api/inventory-units'),
          axios.get('http://localhost:5003/api/inventory-bays')
        ]);

        setMfuOptions(mfuRes.data.map(item => ({
          code: item.factoryUnitCode,
          description: item.factoryUnitName
        })));

        setInventoryUnitOptions(iuRes.data.map(item => ({
          code: item.InventoryUnitId,
          description: item.InventoryUnitName
        })));

        setInventoryBayOptions(ibRes.data.map(item => ({
          code: item.InventoryBayId,
          description: item.InventoryBayName
        })));

        // Fetch existing assignment if factoryUnitCode exists
        if (factoryUnitCode) {
          const assignmentRes = await axios.get(
            `http://localhost:3003/api/factory-units/${factoryUnitCode}`
          );
          setAssignment({
            mfuCode: assignmentRes.data.factoryUnitCode || "",
            mfuDescription: assignmentRes.data.factoryUnitName || "",
            InventoryUnitCode: assignmentRes.data.InventoryUnitCode || "",
            InventoryUnitDescription: assignmentRes.data.InventoryUnitName || "",
            InventoryBayCode: assignmentRes.data.InventoryBayCode || "",
            InventoryBayDescription: assignmentRes.data.InventoryBayName || ""
          });
        }

        setIsLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load data');
        setIsLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [factoryUnitCode]);

  const handleEdit = () => setIsEditing(true);
  
  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      const dataToSave = {
        factoryUnitCode: assignment.mfuCode,
        InventoryUnitCode: assignment.InventoryUnitCode,
        InventoryBayCode: assignment.InventoryBayCode
      };

      const url = factoryUnitCode 
        ? `http://localhost:3003/api/factory-units/${factoryUnitCode}`
        : 'http://localhost:3003/api/factory-units';

      const method = factoryUnitCode ? 'put' : 'post';

      await axios[method](url, dataToSave);

      setIsEditing(false);
      setIsLoading(false);
      alert('Assignment saved successfully!');
      navigate('/MfuIuIb');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save data');
      setIsLoading(false);
      console.error('Error saving data:', err);
    }
  };
  
  const handleCancel = () => {
    if (!isEditing) {
      navigate('/MfuIuIb');
    } else {
      setIsEditing(false);
    }
  };

  const handleSelectChange = (field, value, descriptionField, options) => {
    const selectedOption = options.find(opt => opt.code === value);
    setAssignment(prev => ({
      ...prev,
      [field]: value,
      [descriptionField]: selectedOption?.description || ""
    }));
  };

  if (isLoading) return <div className="business-entity-container">Loading...</div>;
  if (error) return <div className="business-entity-container">Error: {error}</div>;

  return (
    <div className="business-entity-container">
      <div className="business-entity-panel">
        <div className="button-row">
          <div className="left-buttons">
            {!isEditing ? (
              <button onClick={handleEdit} className="edit-button">Edit</button>
            ) : (
              <button onClick={handleSave} className="save-button">Save</button>
            )}
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
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
              <tr>
                <td>
                  {isEditing ? (
                    <select
                      className="editable-input"
                      value={assignment.mfuCode}
                      onChange={(e) => handleSelectChange(
                        'mfuCode', 
                        e.target.value, 
                        'mfuDescription',
                        mfuOptions
                      )}
                    >
                      <option value="">Select MFU</option>
                      {mfuOptions.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.code}
                        </option>
                      ))}
                    </select>
                  ) : (
                    assignment.mfuCode || "-"
                  )}
                </td>
                <td>
                  {assignment.mfuDescription || "-"}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      className="editable-input"
                      value={assignment.InventoryUnitCode}
                      onChange={(e) => handleSelectChange(
                        'InventoryUnitCode', 
                        e.target.value, 
                        'InventoryUnitDescription',
                        InventoryUnitOptions
                      )}
                    >
                      <option value="">Select Inventory Unit</option>
                      {InventoryUnitOptions.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.code}
                        </option>
                      ))}
                    </select>
                  ) : (
                    assignment.InventoryUnitCode || "-"
                  )}
                </td>
                <td>
                  {assignment.InventoryUnitDescription || "-"}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      className="editable-input"
                      value={assignment.InventoryBayCode}
                      onChange={(e) => handleSelectChange(
                        'InventoryBayCode', 
                        e.target.value, 
                        'InventoryBayDescription',
                        InventoryBayOptions
                      )}
                    >
                      <option value="">Select Inventory Bay</option>
                      {InventoryBayOptions.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.code}
                        </option>
                      ))}
                    </select>
                  ) : (
                    assignment.InventoryBayCode || "-"
                  )}
                </td>
                <td>
                  {assignment.InventoryBayDescription || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MfuIuIbManager;