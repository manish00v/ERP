import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';
import { useNavigate } from "react-router-dom";

function DeliveryLocationTable() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [deliveryLocations, setDeliveryLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Delivery Location');
    setNewButtonLink('/createDeliveryLocationForm');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  const fetchDeliveryLocations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3003/api/delivery-locations");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDeliveryLocations(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch delivery locations");
      setDeliveryLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveryLocations();
  }, []);

    const handleCodeClick = (deliveryLocationCode) => {
    navigate(`/editDeliveryLocationForm/${deliveryLocationCode}`);
  };

  return (
    <div className="organizational-container-table">
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Delivery Location Code</th>
              <th className="organizational-table__header">Delivery Location Name</th>
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
                <td colSpan="4" className="organizational__error-message">Error: {error}</td>
              </tr>
            ) : deliveryLocations.length > 0 ? (
              deliveryLocations.map((location) => (
                <tr 
                  key={location.deliveryLocationCode} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(location.deliveryLocationCode)}
                    >
                      {location.deliveryLocationCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{location.deliveryLocationName || '-'}</td>
                  <td className="organizational-table__cell">{location.city || '-'} </td>
                  <td className="organizational-table__cell">{location.region || '-'}
                  </td>
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
