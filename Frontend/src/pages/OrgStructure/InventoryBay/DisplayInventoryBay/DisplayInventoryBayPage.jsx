import { useState, useEffect, useContext } from "react";
import { Search } from 'lucide-react';
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function DisplayInventoryBayPage() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [inventoryBays, setInventoryBays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for inventory bays
  const mockData = [
    { code: 'IB01', description: 'Main Warehouse Aisle 1', stockingType: 'Pallet' },
    { code: 'IB02', description: 'Cold Storage Room', stockingType: 'Case' },
    { code: 'IB03', description: 'High Security Vault', stockingType: 'Item' },
    { code: 'IB04', description: 'Shipping Dock Area', stockingType: 'Bulk' },
    { code: 'IB05', description: 'Returns Processing', stockingType: 'Mixed' }
  ];

  useEffect(() => {
    setPageTitle('Inventory Bay');
    setNewButtonLink('/createInventoryBay');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  const mockFetch = (searchTerm = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (searchTerm) {
          const filteredData = mockData.filter(bay => 
            bay.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bay.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (bay.stockingType && bay.stockingType.toLowerCase().includes(searchTerm.toLowerCase()))
          );
          resolve(filteredData);
        } else {
          resolve([...mockData]);
        }
      }, 500);
    });
  };

  const fetchInventoryBays = async (searchTerm = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetch(searchTerm);
      setInventoryBays(data);
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

  const handleCodeClick = (code) => {
    window.location.href = `/editInventoryBay`;
  };

  return (
    <div className="organizational-container-table">
      
      {/* Inventory Bay Table */}
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