import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function SalesOfficeTable() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [salesOffices, setSalesOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for sales offices
  const mockData = [
    { code: 'SO01', name: 'North Sales Office', region: 'Northeast', manager: 'John Smith', status: 'Active' },
    { code: 'SO02', name: 'West Sales Office', region: 'West', manager: 'Sarah Johnson', status: 'Active' },
    { code: 'SO03', name: 'South Sales Office', region: 'South', manager: 'Mike Williams', status: 'Inactive' },
    { code: 'SO04', name: 'East Sales Office', region: 'Northeast', manager: 'Emily Brown', status: 'Active' },
    { code: 'SO05', name: 'Central Sales Office', region: 'Midwest', manager: 'David Jones', status: 'Active' }
  ];

  useEffect(() => {
    setPageTitle('Sales Office');
    setNewButtonLink('/createSalesOffice');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  const mockFetch = (searchCode = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (searchCode) {
          const filteredData = mockData.filter(office => 
            office.code.toLowerCase().includes(searchCode.toLowerCase()) ||
            office.name.toLowerCase().includes(searchCode.toLowerCase()) ||
            office.region.toLowerCase().includes(searchCode.toLowerCase()) ||
            office.manager.toLowerCase().includes(searchCode.toLowerCase())
          );
          resolve(filteredData);
        } else {
          resolve([...mockData]);
        }
      }, 500);
    });
  };

  const fetchSalesOffices = async (code = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetch(code);
      setSalesOffices(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch sales offices');
      setSalesOffices([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesOffices();
  }, []);

  const handleCodeClick = (code) => {
    window.location.href = `/editSalesOffice`;
  };

  return (
    <div className="organizational-container-table">
      {/* Sales Office Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Sales Office Code</th>
              <th className="organizational-table__header">Sales Office Name</th>
              <th className="organizational-table__header">Region</th>
              <th className="organizational-table__header">Manager</th>
              <th className="organizational-table__header">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="organizational__loading-message">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="organizational__error-message">
                  Error: {error}
                </td>
              </tr>
            ) : salesOffices.length > 0 ? (
              salesOffices.map((office) => (
                <tr 
                  key={office.code} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(office.code)}
                    >
                      {office.code}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{office.name || '-'}</td>
                  <td className="organizational-table__cell">{office.region || '-'}</td>
                  <td className="organizational-table__cell">{office.manager || '-'}</td>
                  <td className="organizational-table__cell">{office.status || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="organizational__no-data-message">No sales offices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesOfficeTable;