import { useState, useEffect, useContext } from "react";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function DisplaySalesTeamPage() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [salesTeams, setSalesTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for sales teams
  const mockData = [
    { code: 'ST01', name: 'North Sales Team' },
    { code: 'ST02', name: 'West Sales Team' },
    { code: 'ST03', name: 'South Sales Team' },
    { code: 'ST04', name: 'East Sales Team' },
    { code: 'ST05', name: 'Central Sales Team' }
  ];

  useEffect(() => {
    setPageTitle('Sales Team');
    setNewButtonLink('/createSalesTeamForm');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  const mockFetch = (searchTerm = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (searchTerm) {
          const filteredData = mockData.filter(team => 
            team.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            team.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          resolve(filteredData);
        } else {
          resolve([...mockData]);
        }
      }, 500);
    });
  };

  const fetchSalesTeams = async (searchTerm = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetch(searchTerm);
      setSalesTeams(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch sales teams');
      setSalesTeams([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesTeams();
  }, []);


  const handleCodeClick = () => {
    window.location.href = `/editSalesTeamForm`;
  };

  return (
    <div className="organizational-container-table">
      
      {/* Sales Team Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Team Code</th>
              <th className="organizational-table__header">Team Name</th>
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
            ) : salesTeams.length > 0 ? (
              salesTeams.map((team) => (
                <tr 
                  key={team.code} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(team.code)}
                    >
                      {team.code}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{team.name || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="organizational__no-data-message">No sales teams found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplaySalesTeamPage;