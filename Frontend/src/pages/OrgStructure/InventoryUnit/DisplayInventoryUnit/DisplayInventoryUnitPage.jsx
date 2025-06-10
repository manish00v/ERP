import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';
import { useNavigate } from "react-router-dom";

function DisplayInventoryUnitPage() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [inventoryUnits, setInventoryUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Inventory Unit');
    setNewButtonLink('/createInventoryUnit');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  const fetchInventoryUnits = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5003/api/inventory-units');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Map the backend data model to the UI format
      const transformedData = data.map(unit => ({
        code: unit.InventoryUnitId,
        description: unit.InventoryUnitName,
        inventoryControl: unit.InventoryControl,
        text: `${unit.StreetAddress}, ${unit.City}, ${unit.Region}, ${unit.Country} - ${unit.PinCode}`
      }));

      setInventoryUnits(transformedData);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch inventory units');
      setInventoryUnits([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryUnits();
  }, []);

  const handleCodeClick = (InventoryUnitId) => {
    navigate(`/editInventoryUnit/${InventoryUnitId}`);
  };

  return (
    <div className="organizational-container-table">
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Unit Code</th>
              <th className="organizational-table__header">Description</th>
              <th className="organizational-table__header">Control</th>
              <th className="organizational-table__header">Notes</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="organizational__loading-message">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4" className="organizational__error-message">
                  Error: {error}
                </td>
              </tr>
            ) : inventoryUnits.length > 0 ? (
              inventoryUnits.map((unit) => (
                <tr 
                  key={unit.code} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(unit.code)}
                    >
                      {unit.code}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{unit.description || '-'}</td>
                  <td className="organizational-table__cell">
                    <span className={`organizational-table__control-badge ${unit.inventoryControl ? unit.inventoryControl.toLowerCase().replace(' ', '-') : ''}`}>
                      {unit.inventoryControl || '-'}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{unit.text || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="organizational__no-data-message">No inventory units found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayInventoryUnitPage;
