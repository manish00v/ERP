import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditAssignmentTable.css';

const EditAssignmentTable = () => {
  const navigate = useNavigate();
  const { businessEntityCode } = useParams();
  
  const [assignment, setAssignment] = useState({
    businessEntityName: "",
    factoryUnitCode: "",
    factoryUnitName: "",
    businessUnitCode: "",
    businessUnitDesc: ""
  });

  const [mfuOptions, setMfuOptions] = useState([]);
  const [businessUnitOptions, setBusinessUnitOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dropdown options
        const [mfuRes, buRes] = await Promise.all([
          axios.get('http://localhost:3003/api/factory-units'),
          axios.get('http://localhost:3003/api/business-units')
        ]);

        setMfuOptions(mfuRes.data.map(item => ({
          code: item.factoryUnitCode,
          description: item.factoryUnitName
        })));

        setBusinessUnitOptions(buRes.data.map(item => ({
          code: item.businessUnitCode,
          name: item.businessUnitDesc || item.businessUnitName
        })));

        // Fetch existing assignment if businessEntityCode exists
        if (businessEntityCode) {
          const assignmentRes = await axios.get(
            `http://localhost:3003/api/business-entities/${businessEntityCode}`
          );
          setAssignment({
            businessEntityName: assignmentRes.data.businessEntityName || "",
            factoryUnitCode: assignmentRes.data.factoryUnitCode || "",
            factoryUnitName: assignmentRes.data.factoryUnitName || "",
            businessUnitCode: assignmentRes.data.businessUnitCode || "",
            businessUnitDesc: assignmentRes.data.businessUnitDesc || ""
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
  }, [businessEntityCode]);

  const handleEdit = () => setIsEditing(true);
  
  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Prepare data for API - structure according to backend requirements
      const dataToSave = {
        businessEntityName: assignment.businessEntityName,
        factoryUnitCode: assignment.factoryUnitCode,
        businessUnitCode: assignment.businessUnitCode
      };

      const url = businessEntityCode 
        ? `http://localhost:3003/api/business-entities/${businessEntityCode}`
        : 'http://localhost:3003/api/business-entities';

      const method = businessEntityCode ? 'put' : 'post';

      await axios[method](url, dataToSave);

      setIsEditing(false);
      setIsLoading(false);
      alert('Assignment saved successfully!');
      navigate('/BUMFUBE');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save data');
      setIsLoading(false);
      console.error('Error saving data:', err);
    }
  };
  
  const handleCancel = () => {
    if (!isEditing) {
      navigate('/BUMFUBE');
    } else {
      setIsEditing(false);
    }
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
                <th>Business Entity Code</th>
                <th>Business Entity Name</th>
                <th>MFU Code</th>
                <th>MFU name</th>
                <th>Business unit code</th>
                <th>Business Unit name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{businessEntityCode || "New Assignment"}</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="editable-input"
                      value={assignment.businessEntityName}
                      onChange={(e) => setAssignment({
                        ...assignment,
                        businessEntityName: e.target.value
                      })}
                    />
                  ) : (
                    assignment.businessEntityName
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      className="editable-input"
                      value={assignment.factoryUnitCode}
                      onChange={(e) => {
                        const selectedMfu = mfuOptions.find(opt => opt.code === e.target.value);
                        setAssignment({
                          ...assignment,
                          factoryUnitCode: e.target.value,
                          factoryUnitName: selectedMfu?.description || ""
                        });
                      }}
                    >
                      <option value="">Select MFU</option>
                      {mfuOptions.map((option) => (
                        <option key={option.code} value={option.code}>{option.code}</option>
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
                      value={assignment.factoryUnitName}
                      readOnly
                    />
                  ) : (
                    assignment.factoryUnitName
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      className="editable-input"
                      value={assignment.businessUnitCode}
                      onChange={(e) => {
                        const selectedBu = businessUnitOptions.find(opt => opt.code === e.target.value);
                        setAssignment({
                          ...assignment,
                          businessUnitCode: e.target.value,
                          businessUnitDesc: selectedBu?.name || ""
                        });
                      }}
                    >
                      <option value="">Select Business Unit</option>
                      {businessUnitOptions.map((option) => (
                        <option key={option.code} value={option.code}>{option.code}</option>
                      ))}
                    </select>
                  ) : (
                    assignment.businessUnitCode
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input 
                      type="text" 
                      className="editable-input"
                      value={assignment.businessUnitDesc}
                      readOnly
                    />
                  ) : (
                    assignment.businessUnitDesc
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

export default EditAssignmentTable;