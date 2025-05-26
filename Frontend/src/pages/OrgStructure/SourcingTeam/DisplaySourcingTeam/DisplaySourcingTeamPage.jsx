import { useState, useEffect, useContext } from "react";
import { Search } from 'lucide-react';
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function DisplaySourcingTeamPage() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [sourcingTeams, setSourcingTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for sourcing teams
  const mockData = [
    { code: 'SCT1', description: 'Global Procurement Team', type: 'International', email: 'global.procurement@example.com' },
    { code: 'SCT2', description: 'Local Sourcing Team', type: 'Regional', email: 'local.sourcing@example.com' },
    { code: 'SCT3', description: 'Raw Materials Team', type: 'Specialized', email: 'raw.materials@example.com' },
    { code: 'SCT4', description: 'Vendor Relations Team', type: 'Coordination', email: 'vendor.relations@example.com' },
    { code: 'SCT5', description: 'Strategic Sourcing', type: 'Management', email: 'strategic.sourcing@example.com' }
  ];

  useEffect(() => {
    setPageTitle('Sourcing Team');
    setNewButtonLink('/createSourcingTeam');

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
            team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (team.type && team.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (team.email && team.email.toLowerCase().includes(searchTerm.toLowerCase()))
          );
          resolve(filteredData);
        } else {
          resolve([...mockData]);
        }
      }, 500);
    });
  };

  const fetchSourcingTeams = async (searchTerm = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mockFetch(searchTerm);
      setSourcingTeams(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch sourcing teams');
      setSourcingTeams([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSourcingTeams();
  }, []);

  const handleCodeClick = (code) => {
    window.location.href = `/editSourcingTeam`;
  };

  return (
    <div className="organizational-container-table">
   
      {/* Sourcing Team Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Sourcing Team Code</th>
              <th className="organizational-table__header">Description</th>
              <th className="organizational-table__header">Type</th>
              <th className="organizational-table__header">Email</th>
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
            ) : sourcingTeams.length > 0 ? (
              sourcingTeams.map((team) => (
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
                  <td className="organizational-table__cell">{team.description || '-'}</td>
                  <td className="organizational-table__cell">
                    <span className={`organizational-table__type-badge ${team.type ? team.type.toLowerCase().replace(' ', '-') : ''}`}>
                      {team.type || '-'}
                    </span>
                  </td>
                  <td className="organizational-table__cell">
                    {team.email ? (
                      <a href={`mailto:${team.email}`} className="organizational-table__email-link">
                        {team.email}
                      </a>
                    ) : '-'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="organizational__no-data-message">No sourcing teams found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplaySourcingTeamPage;