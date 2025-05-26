import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function DisplaySalesChannelPage() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [salesChannels, setSalesChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for sales channels
  const mockData = [
    { code: 'SC01', description: 'Online Store' },
    { code: 'SC02', description: 'Retail Partners' },
    { code: 'SC03', description: 'Wholesale' },
    { code: 'SC04', description: 'Mobile App' },
    { code: 'SC05', description: 'Marketplace' }
  ];

  useEffect(() => {
    setPageTitle('Sales Channel');
    setNewButtonLink('/createSalesChannel');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  const mockFetch = (searchTerm = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (searchTerm) {
          const filteredData = mockData.filter(channel => 
            channel.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            channel.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          resolve(filteredData);
        } else {
          resolve([...mockData]);
        }
      }, 500);
    });
  };

  const fetchSalesChannels = async (searchTerm = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetch(searchTerm);
      setSalesChannels(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch sales channels');
      setSalesChannels([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesChannels();
  }, []);

  const handleCodeClick = () => {
    window.location.href = `/editSalesChannel`;
  };

  return (
    <div className="organizational-container-table">
      

      {/* Sales Channel Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Channel Code</th>
              <th className="organizational-table__header">Description</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="2" className="organizational__loading-message">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="2" className="organizational__error-message">
                  Error: {error}
                </td>
              </tr>
            ) : salesChannels.length > 0 ? (
              salesChannels.map((channel) => (
                <tr 
                  key={channel.code} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(channel.code)}
                    >
                      {channel.code}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{channel.description || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="organizational__no-data-message">No sales channels found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplaySalesChannelPage;