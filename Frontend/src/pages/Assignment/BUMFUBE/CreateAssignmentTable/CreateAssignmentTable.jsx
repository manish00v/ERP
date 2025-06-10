import { useState, useEffect } from "react";
import './createAssignmentTable.css';
import axios from 'axios';

function CreateAssignmentTable() {
  // State for options data
  const [businessEntityOptions, setBusinessEntityOptions] = useState([]);
  const [mfuOptions, setMfuOptions] = useState([]);
  const [businessUnitOptions, setBusinessUnitOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for table data
  const [assignmentData, setAssignmentData] = useState([
    {
      businessEntityCode: '',
      businessEntityDesc: '',
      mfuCode: '',
      mfuDesc: '',
      businessUnitCode: '',
      businessUnitDesc: ''
    }
  ]);

  // Fetch options data on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [entitiesRes, unitsRes, factoryUnitsRes] = await Promise.all([
          axios.get('http://localhost:3003/api/business-entities'),
          axios.get('http://localhost:3003/api/business-units'),
          axios.get('http://localhost:3003/api/factory-units')
        ]);

        setBusinessEntityOptions(entitiesRes.data.map(item => ({
          code: item.businessEntityCode,
          name: item.businessEntityName || ''
        })));

        setBusinessUnitOptions(unitsRes.data.map(item => ({
          code: item.businessUnitCode,
          name: item.businessUnitName || ''
        })));

        setMfuOptions(factoryUnitsRes.data.map(item => ({
          code: item.factoryUnitCode,
          name: item.factoryUnitName || ''
        })));

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        console.error('Error fetching options:', err);
      }
    };

    fetchOptions();
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const handleAddRow = () => {
    setAssignmentData([
      ...assignmentData,
      {
        businessEntityCode: '',
        businessEntityDesc: '',
        mfuCode: '',
        mfuDesc: '',
        businessUnitCode: '',
        businessUnitDesc: ''
      }
    ]);
  };

  const handleRemoveRow = (index) => {
    if (assignmentData.length > 1) {
      const newData = assignmentData.filter((_, i) => i !== index);
      setAssignmentData(newData);
    }
  };

  const handleCodeChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;

    // Update corresponding name based on selected code
    let options, nameField;
    if (field === 'businessEntityCode') {
      options = businessEntityOptions;
      nameField = 'businessEntityDesc';
    } else if (field === 'mfuCode') {
      options = mfuOptions;
      nameField = 'mfuDesc';
    } else if (field === 'businessUnitCode') {
      options = businessUnitOptions;
      nameField = 'businessUnitDesc';
    }

    const selectedOption = options.find(opt => opt.code === value);
    newData[index][nameField] = selectedOption ? selectedOption.name : '';

    setAssignmentData(newData);
  };

  const handleDescChange = (index, field, value) => {
    const newData = [...assignmentData];
    newData[index][field] = value;
    setAssignmentData(newData);
  };

  const handleSave = async () => {
  const dataToSave = assignmentData.map(row => ({
    businessEntityCode: row.businessEntityCode,
    factoryUnitCode: row.mfuCode,
    businessUnitCode: row.businessUnitCode
  }));

  try {
    // For each row, send a PUT request to update the corresponding business entity
    for (const row of dataToSave) {
      await axios.put(`http://localhost:3003/api/business-entities/${row.businessEntityCode}`, {
        factoryUnitCode: row.factoryUnitCode,
        businessUnitCode: row.businessUnitCode
      });
    }

    alert('Data saved successfully!');
  } catch (err) {
    console.error('Error saving data:', err);
    alert('Failed to save data.');
  }
};


  if (isLoading) {
    return <div className="assignment-container">Loading options...</div>;
  }

  if (error) {
    return <div className="assignment-container">Error: {error}</div>;
  }

  return (
    <div className="assignment-container">
      {/* Action buttons */}
      <div className="assignment-button-wrapper">
        <button onClick={handleBack} className="assignment-cancel-button">
          Cancel
        </button>
        <button onClick={handleSave} className="assignment-save-button">
          Save
        </button>
      </div>

      {/* Assignment Table */}
      <div className="assignment-table-wrapper">
        <table className="assignment-table">
          <thead>
            <tr>
              <th>Business Entity Code</th>
              <th>Business Entity name</th>
              <th>MFU Code</th>
              <th>MFU name</th>
              <th>Business Unit Code</th>
              <th>Business Unit name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignmentData.map((assignment, index) => (
              <tr key={index}>
                {/* Business Entity Code Dropdown */}
                <td>
                  <select
                    value={assignment.businessEntityCode}
                    onChange={(e) => handleCodeChange(index, 'businessEntityCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {businessEntityOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Business Entity name */}
                <td>
                  <input
                    type="text"
                    value={assignment.businessEntityDesc}
                    onChange={(e) => handleDescChange(index, 'businessEntityDesc', e.target.value)}
                    className="assignment-desc-input"
                    readOnly
                  />
                </td>

                {/* MFU Code Dropdown */}
                <td>
                  <select
                    value={assignment.mfuCode}
                    onChange={(e) => handleCodeChange(index, 'mfuCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {mfuOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>

                {/* MFU name */}
                <td>
                  <input
                    type="text"
                    value={assignment.mfuDesc}
                    onChange={(e) => handleDescChange(index, 'mfuDesc', e.target.value)}
                    className="assignment-desc-input"
                    readOnly
                  />
                </td>

                {/* Business Unit Code Dropdown */}
                <td>
                  <select
                    value={assignment.businessUnitCode}
                    onChange={(e) => handleCodeChange(index, 'businessUnitCode', e.target.value)}
                    className="assignment-code-dropdown"
                  >
                    <option value="">Select</option>
                    {businessUnitOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Business Unit name */}
                <td>
                  <input
                    type="text"
                    value={assignment.businessUnitDesc}
                    onChange={(e) => handleDescChange(index, 'businessUnitDesc', e.target.value)}
                    className="assignment-desc-input"
                    readOnly
                  />
                </td>

                {/* Delete Row */}
                <td>
                  {assignmentData.length > 1 && (
                    <button
                      onClick={() => handleRemoveRow(index)}
                      className="remove-row-button"
                      title="Remove row"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {/* Add row button */}
            <tr>
              <td colSpan="7" className="add-row-cell">
                <button
                  onClick={handleAddRow}
                  className="add-row-button"
                  title="Add new row"
                >
                  <i className="fas fa-plus-circle"></i> Add Row
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreateAssignmentTable;
