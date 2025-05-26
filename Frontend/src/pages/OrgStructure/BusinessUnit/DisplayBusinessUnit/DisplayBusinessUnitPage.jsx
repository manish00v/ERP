import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';
import { Search } from 'lucide-react';

function BusinessUnitTable() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for business units
  const mockData = [
    { code: 'BU01', name: 'Marketing Unit', entityCode: 'BE01', status: 'Active' },
    { code: 'BU02', name: 'Sales Unit', entityCode: 'BE02', status: 'Active' },
    { code: 'BU03', name: 'Finance Unit', entityCode: 'BE03', status: 'Inactive' },
    { code: 'BU04', name: 'HR Unit', entityCode: 'BE04', status: 'Active' },
    { code: 'BU05', name: 'IT Unit', entityCode: 'BE05', status: 'Active' }
  ];

  useEffect(() => {
    setPageTitle('Business Unit');
    setNewButtonLink('/createBusinessUnit');

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
            unit.name.toLowerCase().includes(searchCode.toLowerCase()) ||
            unit.entityCode.toLowerCase().includes(searchCode.toLowerCase())
          );
          resolve(filteredData);
        } else {
          resolve([...mockData]);
        }
      }, 500);
    });
  };

  const fetchBusinessUnits = async (code = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetch(code);
      setBusinessUnits(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch business units');
      setBusinessUnits([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessUnits();
  }, []);


  const handleCodeClick = (code) => {
    window.location.href = `/editBusinessUnit`;
  };

  return (
    <div className="organizational-container-table"> 

      {/* Business Unit Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Business Unit Code</th>
              <th className="organizational-table__header">Business Unit Name</th>
              <th className="organizational-table__header">Business Entity Code</th>
              <th className="organizational-table__header">Status</th>
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
            ) : businessUnits.length > 0 ? (
              businessUnits.map((unit) => (
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
                  <td className="organizational-table__cell">{unit.entityCode || '-'}</td>
                  <td className="organizational-table__cell">{unit.status || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="organizational__no-data-message">No business units found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusinessUnitTable;