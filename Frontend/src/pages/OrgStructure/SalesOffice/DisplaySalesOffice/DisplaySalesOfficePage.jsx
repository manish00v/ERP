import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';
import { useNavigate } from "react-router-dom";



function SalesOfficeTable() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [salesOffices, setSalesOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Sales Office');
    setNewButtonLink('/createSalesOffice');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  const fetchSalesOffices = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3003/api/sales-offices/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Transform the response to match table structure
      const transformed = data.map(item => ({
        code: item.salesOfficeCode,
        name: item.salesOfficeDesc,
        city: item.city,
        region: item.region || '-',
    
      }));

      setSalesOffices(transformed);
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

 

  
  const handleCodeClick = (salesOfficeCode) => {
    navigate(`/editSalesOffice/${salesOfficeCode}`);
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
              <th className="organizational-table__header">City</th>
              <th className="organizational-table__header">Region</th>
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
                  <td className="organizational-table__cell">{office.city || '-'}</td>
                  <td className="organizational-table__cell">{office.region || '-'}</td>
               
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
