import { useState, useEffect, useContext } from "react";
import { Search } from 'lucide-react';
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';
import { useNavigate } from "react-router-dom";

function DisplaySourcingTeamPage() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [sourcingTeams, setSourcingTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Sourcing Team');
    setNewButtonLink('/createSourcingTeam');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  const fetchSourcingTeams = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5003/api/sourcing-teams/');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      // Ensure keys match table expectations
      const formatted = data.map(team => ({
        code: team.SourcingTeamId,
        description: team.SourcingTeamName,
        type: team.TeamType,
        email: team.Email
      }));

      setSourcingTeams(formatted);
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

  // const handleCodeClick = (code) => {
  //   window.location.href = `/editSourcingTeam?code=${code}`;
  // };
  const handleCodeClick = (SourcingTeamId) => {
    navigate(`/editSourcingTeam/${SourcingTeamId}`);
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
                <td colSpan="4" className="organizational__error-message">Error: {error}</td>
              </tr>
            ) : sourcingTeams.length > 0 ? (
              sourcingTeams.map((team) => (
                <tr key={team.code} className="organizational-table__row organizational-table__row--body">
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
