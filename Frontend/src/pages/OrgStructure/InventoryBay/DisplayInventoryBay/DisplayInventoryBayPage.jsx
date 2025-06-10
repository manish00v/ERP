import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';
import { useNavigate } from "react-router-dom";

function DisplayInventoryBayPage() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [inventoryBays, setInventoryBays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Inventory Bay');
    setNewButtonLink('/createInventoryBay');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  const fetchInventoryBays = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:5003/api/inventory-bays");
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const formatted = data.map((item) => ({
        code: item.InventoryBayId,
        description: item.InventoryBayName,
        stockingType: item.StockingType,
      }));
      setInventoryBays(formatted);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch inventory bays');
      setInventoryBays([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryBays();
  }, []);

    const handleCodeClick = (InventoryBayId) => {
    navigate(`/editInventoryBay/${InventoryBayId}`);
  };
  return (
    <div className="organizational-container-table">
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Bay Code</th>
              <th className="organizational-table__header">Description</th>
              <th className="organizational-table__header">Stocking Type</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" className="organizational__loading-message">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="3" className="organizational__error-message">
                  Error: {error}
                </td>
              </tr>
            ) : inventoryBays.length > 0 ? (
              inventoryBays.map((bay) => (
                <tr 
                  key={bay.code} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(bay.code)}
                    >
                      {bay.code}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{bay.description || '-'}</td>
                  <td className="organizational-table__cell">
                    <span className={`organizational-table__stocking-badge ${bay.stockingType ? bay.stockingType.toLowerCase().replace(' ', '-') : ''}`}>
                      {bay.stockingType || '-'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="organizational__no-data-message">No inventory bays found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayInventoryBayPage;
