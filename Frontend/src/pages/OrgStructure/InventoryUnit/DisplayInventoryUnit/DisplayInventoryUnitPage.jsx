import { useState, useEffect, useContext } from "react";
import { Search } from 'lucide-react';
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function DisplayInventoryUnitPage() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [inventoryUnits, setInventoryUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for inventory units
  const mockData = [
    { code: 'IU01', description: 'Primary Storage Unit', inventoryControl: 'Automated', text: 'Main warehouse unit' },
    { code: 'IU02', description: 'Cold Storage Unit', inventoryControl: 'Manual', text: 'Refrigerated items only' },
    { code: 'IU03', description: 'High-Value Vault', inventoryControl: 'Restricted', text: 'Security level 3 required' },
    { code: 'IU04', description: 'Returns Processing', inventoryControl: 'Quarantine', text: 'Pending inspection' },
    { code: 'IU05', description: 'Shipping Prep Area', inventoryControl: 'Temporary', text: 'Daily audit required' }
  ];

  useEffect(() => {
    setPageTitle('Inventory Unit');
    setNewButtonLink('/createInventoryUnit');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  const mockFetch = (searchTerm = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (searchTerm) {
          const filteredData = mockData.filter(unit => 
            unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (unit.inventoryControl && unit.inventoryControl.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (unit.text && unit.text.toLowerCase().includes(searchTerm.toLowerCase()))
          );
          resolve(filteredData);
        } else {
          resolve([...mockData]);
        }
      }, 500);
    });
  };

  const fetchInventoryUnits = async (searchTerm = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetch(searchTerm);
      setInventoryUnits(data);
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

  const handleCodeClick = (code) => {
    window.location.href = `/editInventoryUnit`;
  };

  return (
    <div className="organizational-container-table">

      {/* Inventory Unit Table */}
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