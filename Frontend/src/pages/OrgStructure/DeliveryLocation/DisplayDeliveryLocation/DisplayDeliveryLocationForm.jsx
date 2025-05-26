import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function DeliveryLocationTable() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [deliveryLocations, setDeliveryLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for delivery locations
  const mockData = [
    { code: 'DL01', name: 'North Warehouse', address: '123 Main St, New York', contact: 'John Doe (555-0101)' },
    { code: 'DL02', name: 'West Distribution', address: '456 Oak Ave, Los Angeles', contact: 'Jane Smith (555-0202)' },
    { code: 'DL03', name: 'South Logistics', address: '789 Pine Rd, Houston', contact: 'Mike Johnson (555-0303)' },
    { code: 'DL04', name: 'East Depot', address: '101 Elm Blvd, Boston', contact: 'Sarah Williams (555-0404)' },
    { code: 'DL05', name: 'Central Hub', address: '202 Maple Dr, Chicago', contact: 'David Brown (555-0505)' }
  ];

  useEffect(() => {
    setPageTitle('Delivery Location');
    setNewButtonLink('/createDeliveryLocationForm');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  const mockFetch = (searchCode = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (searchCode) {
          const filteredData = mockData.filter(location => 
            location.code.toLowerCase().includes(searchCode.toLowerCase()) ||
            location.name.toLowerCase().includes(searchCode.toLowerCase())
          );
          resolve(filteredData);
        } else {
          resolve([...mockData]);
        }
      }, 500);
    });
  };

  const fetchDeliveryLocations = async (code = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetch(code);
      setDeliveryLocations(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch delivery locations');
      setDeliveryLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveryLocations();
  }, []);
  const handleCodeClick = () => {
    window.location.href = `/editDeliveryLocationForm`;
  };

  return (
    <div className="organizational-container-table">

      {/* Delivery Location Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Delivery Location Code</th>
              <th className="organizational-table__header">Location Name</th>
              <th className="organizational-table__header">Address</th>
              <th className="organizational-table__header">Contact</th>
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
            ) : deliveryLocations.length > 0 ? (
              deliveryLocations.map((location) => (
                <tr 
                  key={location.code} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(location.code)}
                    >
                      {location.code}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{location.name || '-'}</td>
                  <td className="organizational-table__cell">{location.address || '-'}</td>
                  <td className="organizational-table__cell">{location.contact || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="organizational__no-data-message">No delivery locations found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeliveryLocationTable;