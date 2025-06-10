import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../contexts/PageHeaderContext';

const MfuSuSctTable = () => {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('MFU - Sourcing Unit - Sourcing Team');
    setNewButtonLink('/createMfuSuSctAssignment');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch factory units with their sourcing relationships
        const response = await axios.get('http://localhost:3003/api/factory-units', {
         
        });
        
        // Transform the data to match our table structure
        const transformedData = response.data
          .filter(factoryUnit => factoryUnit.sourcingUnitId || factoryUnit.sourcingTeamId)
          .map(factoryUnit => ({
            id: factoryUnit.id,
            mfuCode: factoryUnit.factoryUnitCode,
            sourcingUnitCode: factoryUnit.sourcingUnitId,
            sourcingUnitDesc: factoryUnit.sourcingUnit?.sourcingUnitDesc || '',
            sourcingTeamCode: factoryUnit.sourcingTeamId,
            sourcingTeamName: factoryUnit.sourcingTeam?.sourcingTeamName || ''
          }));
        
        setAssignments(transformedData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching assignments:', err);
        setError('Failed to load data. Please try again.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCodeClick = (type, code) => {
    if (type === 'mfu') {
      navigate(`/editMfuSuSctAssignment/${code}`);
    } else if (type === 'su') {
      navigate(`/sourcing-units/${code}`);
    } else if (type === 'st') {
      navigate(`/sourcing-teams/${code}`);
    }
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
                <td colSpan="5" className="organizational__loading-message">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="organizational__error-message">
                  Error: {error}
                </td>
              </tr>
            ) : assignments.length > 0 ? (
              assignments.map((assignment) => (
                <tr 
                  key={assignment.id} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick('mfu', assignment.mfuCode)}
                    >
                      {assignment.mfuCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">
                    {assignment.sourcingUnitCode ? (
                      <span 
                        className="organizational-table__code-link"
                        onClick={() => handleCodeClick('su', assignment.sourcingUnitCode)}
                      >
                        {assignment.sourcingUnitCode}
                      </span>
                    ) : '-'}
                  </td>
              
                  <td className="organizational-table__cell">
                    {assignment.sourcingTeamCode ? (
                      <span 
                        className="organizational-table__code-link"
                        onClick={() => handleCodeClick('st', assignment.sourcingTeamCode)}
                      >
                        {assignment.sourcingTeamCode}
                      </span>
                    ) : '-'}
                  </td>
                
                </tr>
              ))
            ) : (
              <tr>
                
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MfuSuSctTable;