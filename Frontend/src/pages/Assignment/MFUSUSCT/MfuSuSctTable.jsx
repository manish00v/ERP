import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import '../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../contexts/PageHeaderContext';

const MfuSuSctTable = () => {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock data for MFU-SU-SCT assignments
  const mockData = [
    { id: 1, mfuCode: 'MFU01', sourcingUnitCode: 'SU01', sourcingTeamCode: 'SCT01' },
    { id: 2, mfuCode: 'MFU02', sourcingUnitCode: 'SU02', sourcingTeamCode: 'SCT02' },
    { id: 3, mfuCode: 'MFU03', sourcingUnitCode: 'SU03', sourcingTeamCode: 'SCT03' },
  ];

  useEffect(() => {
    setPageTitle('MFU - Sourcing Unit - Sourcing Team');
    setNewButtonLink('/createMfuSuSctAssignment');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  // Simulate data loading with search
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with search term
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCodeClick = (code) => {
    navigate(`/editMfuSuSctAssignment/`);
  };


  return (
    <div className="organizational-container-table">
      {/* Assignment Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">MFU Code</th>
              <th className="organizational-table__header">Sourcing Unit Code</th>
              <th className="organizational-table__header">Sourcing Team Code</th>
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
            ) : mockData.length > 0 ? (
              mockData.map((entity) => (
                <tr 
                  key={entity.id} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(entity.mfuCode)}
                    >
                      {entity.mfuCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(entity.sourcingUnitCode)}
                    >
                      {entity.sourcingUnitCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(entity.sourcingTeamCode)}
                    >
                      {entity.sourcingTeamCode}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="organizational__no-data-message">
                  {searchTerm ? 'No matching records found' : 'No assignments found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MfuSuSctTable;