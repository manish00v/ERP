import { useState, useEffect, useContext } from "react";
import { Search } from 'lucide-react';
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function DisplaySourcingUnitPage() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [sourcingUnits, setSourcingUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for sourcing units
  const mockData = [
    { code: 'SU001', description: 'Local Suppliers Division' },
    { code: 'SU002', description: 'International Procurement' },
    { code: 'SU003', description: 'Raw Materials Sourcing' },
    { code: 'SU004', description: 'Specialty Components Team' },
    { code: 'SU005', description: 'Vendor Relations Unit' }
  ];

  useEffect(() => {
    setPageTitle('Sourcing Unit');
    setNewButtonLink('/createSourcingUnit');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  const mockFetch = (searchTerm = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (searchTerm) {
          const filteredData = mockData.filter(unit => 
            unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          resolve(filteredData);
        } else {
          resolve([...mockData]);
        }
      }, 500);
    });
  };

  const fetchSourcingUnits = async (searchTerm = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetch(searchTerm);
      setSourcingUnits(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch sourcing units');
      setSourcingUnits([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSourcingUnits();
  }, []);

  const handleCodeClick = (code) => {
    window.location.href = `/editSourcingUnit`;
  };

  return (
    <div className="organizational-container-table">
      
      {/* Sourcing Unit Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Unit Code</th>
              <th className="organizational-table__header">Description</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="2" className="organizational__loading-message">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="2" className="organizational__error-message">
                  Error: {error}
                </td>
              </tr>
            ) : sourcingUnits.length > 0 ? (
              sourcingUnits.map((unit) => (
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="organizational__no-data-message">No sourcing units found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplaySourcingUnitPage;