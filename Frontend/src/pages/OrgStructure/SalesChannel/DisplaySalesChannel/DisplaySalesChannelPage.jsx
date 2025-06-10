import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';
import { useNavigate } from "react-router-dom";


function DisplaySalesChannelPage() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [salesChannels, setSalesChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Sales Channel');
    setNewButtonLink('/createSalesChannel');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  const fetchSalesChannels = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3003/api/sales-channels');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Transform data to match expected table format
      const transformed = data.map(item => ({
        code: item.salesChannelId,
        description: item.salesChannelName
      }));

      setSalesChannels(transformed);
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

  const handleCodeClick = (salesChannelId) => {
    navigate(`/editSalesChannel/${salesChannelId}`);
  };

  return (
    <div className="organizational-container-table">
      {/* Sales Channel Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Channel Code</th>
              <th className="organizational-table__header">Channel Name</th>
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
