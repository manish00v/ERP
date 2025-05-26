import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function ManufacturingFactoryUnitTable() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [factoryUnits, setFactoryUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for manufacturing factory units
  const mockData = [
    { code: 'MFU01', name: 'North Factory', location: 'Detroit', productionCapacity: '1000 units/day' },
    { code: 'MFU02', name: 'West Factory', location: 'Los Angeles', productionCapacity: '850 units/day' },
    { code: 'MFU03', name: 'South Factory', location: 'Houston', productionCapacity: '750 units/day' },
    { code: 'MFU04', name: 'East Factory', location: 'Philadelphia', productionCapacity: '900 units/day' },
    { code: 'MFU05', name: 'Central Factory', location: 'Chicago', productionCapacity: '1100 units/day' }
  ];

  useEffect(() => {
    setPageTitle('Manufacturing Factory Unit');
    setNewButtonLink('/createManufacturingFactoryUnitForm');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  const mockFetch = (searchCode = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (searchCode) {
          const filteredData = mockData.filter(unit => 
            unit.code.toLowerCase().includes(searchCode.toLowerCase()) ||
            unit.name.toLowerCase().includes(searchCode.toLowerCase())
          );
          resolve(filteredData);
        } else {
          resolve([...mockData]);
        }
      }, 500);
    });
  };

  const fetchFactoryUnits = async (code = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetch(code);
      setFactoryUnits(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch manufacturing factory units');
      setFactoryUnits([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFactoryUnits();
  }, []);

  const handleCodeClick = () => {
    window.location.href = `/editManufacturingFactoryUnitForm`;
  };

  return (
    <div className="organizational-container-table">
      
      {/* Manufacturing Factory Unit Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Factory Unit Code</th>
              <th className="organizational-table__header">Factory Unit Name</th>
              <th className="organizational-table__header">Location</th>
              <th className="organizational-table__header">Production Capacity</th>
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
            ) : factoryUnits.length > 0 ? (
              factoryUnits.map((unit) => (
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
                  <td className="organizational-table__cell">{unit.name || '-'}</td>
                  <td className="organizational-table__cell">{unit.location || '-'}</td>
                  <td className="organizational-table__cell">{unit.productionCapacity || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="organizational__no-data-message">No manufacturing factory units found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManufacturingFactoryUnitTable;