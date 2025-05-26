import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function BusinessEntityTable() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [businessEntities, setBusinessEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for business entities
  const mockData = [
    { code: 'BE01', name: 'North Division', city: 'New York', region: 'Northeast' },
    { code: 'BE02', name: 'West Division', city: 'San Francisco', region: 'West' },
    { code: 'BE03', name: 'South Division', city: 'Atlanta', region: 'South' },
    { code: 'BE04', name: 'East Division', city: 'Boston', region: 'Northeast' },
    { code: 'BE05', name: 'Central Division', city: 'Chicago', region: 'Midwest' }
  ];

  useEffect(() => {
    setPageTitle('Business Entity');
    setNewButtonLink('/createBusinessEntity');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  const mockFetch = (searchCode = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (searchCode) {
          const filteredData = mockData.filter(entity => 
            entity.code.toLowerCase().includes(searchCode.toLowerCase()) ||
            entity.name.toLowerCase().includes(searchCode.toLowerCase())
          );
          resolve(filteredData);
        } else {
          resolve([...mockData]);
        }
      }, 500);
    });
  };

  const fetchBusinessEntities = async (code = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetch(code);
      setBusinessEntities(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch business entities');
      setBusinessEntities([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessEntities();
  }, []);

  
  const handleCodeClick = (code) => {
    window.location.href = `/editBusinessEntity`;
  };


  return (
    <div className="organizational-container-table">
      {/* Top navigation */}
      <div className="organizational__top-bar">
      </div>

      {/* Business Entity Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Business Entity Code</th>
              <th className="organizational-table__header">Business Entity Name</th>
              <th className="organizational-table__header">Business Entity City</th>
              <th className="organizational-table__header">Business Entity Region</th>
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
                  key={entity.code} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(entity.code)}
                    >
                      {entity.code}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{entity.name || '-'}</td>
                  <td className="organizational-table__cell">{entity.city || '-'}</td>
                  <td className="organizational-table__cell">{entity.region || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="organizational__no-data-message">No business entities found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusinessEntityTable;