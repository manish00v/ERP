import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function BusinessEntityTable() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [businessEntities, setBusinessEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Business Entity');
    setNewButtonLink('/createBusinessEntity');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  const fetchBusinessEntities = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3003/api/business-entities');
      
      if (!response.ok) {
        throw new Error('Failed to fetch business entities');
      }
      
      const data = await response.json();
      setBusinessEntities(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch business entities');
      setBusinessEntities([]);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSearch = async (searchTerm = '') => {
  //   setIsLoading(true);
  //   setError(null);
    
  //   try {
  //     const response = await fetch(`http://localhost:3003/api/business-entities?search=${encodeURIComponent(searchTerm)}`);
      
  //     if (!response.ok) {
  //       throw new Error('Search failed');
  //     }
      
  //     const data = await response.json();
  //     setBusinessEntities(data);
  //   } catch (err) {
  //     console.error('Search error:', err);
  //     setError('Search failed');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchBusinessEntities();
  }, []);

  const handleCodeClick = (businessEntityCode) => {
    navigate(`/editBusinessEntity/${businessEntityCode}`);
  };

  return (
    <div className="organizational-container-table">
      {/* Top navigation */}
      {/* <div className="organizational__top-bar">
        <div className="organizational__search-container">
          <input
            type="text"
            placeholder="Search by code or name..."
            onChange={(e) => handleSearch(e.target.value)}
            className="organizational__search-input"
          />
        </div>
      </div> */}

      {/* Business Entity Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Business Entity Code</th>
              <th className="organizational-table__header">Business Entity Name</th>
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
            ) : businessEntities.length > 0 ? (
              businessEntities.map((entity) => (
                <tr 
                  key={entity.businessEntityCode} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(entity.businessEntityCode)}
                    >
                      {entity.businessEntityCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{entity.businessEntityName || '-'}</td>
                  <td className="organizational-table__cell">{entity.city || '-'}</td>
                  <td className="organizational-table__cell">{entity.region || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="organizational__no-data-message">
                  No business entities found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusinessEntityTable;