import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function BusinessUnitTable() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Business Unit');
    setNewButtonLink('/createBusinessUnit');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  const fetchBusinessUnits = async (searchTerm = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const url = searchTerm 
        ? `http://localhost:3003/api/business-units?search=${encodeURIComponent(searchTerm)}`
        : 'http://localhost:3003/api/business-units';
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch business units');
      }
      
      const data = await response.json();
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

  const handleCodeClick = (businessUnitCode) => {
    navigate(`/editBusinessUnit/${businessUnitCode}`);
  };

  return (
    <div className="organizational-container-table">
      {/* Top navigation with search */}
    

      {/* Business Unit Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Business Unit Code</th>
              <th className="organizational-table__header">Business Unit Name</th>
              <th className="organizational-table__header">City</th>
              <th className="organizational-table__header">Region</th>
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
                  key={unit.businessUnitCode} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(unit.businessUnitCode)}
                    >
                      {unit.businessUnitCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{unit.businessUnitDesc || '-'}</td>
                  <td className="organizational-table__cell">{unit.city || '-'}</td>
                  <td className="organizational-table__cell">{unit.region || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="organizational__no-data-message">
                  No business units found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusinessUnitTable;