import { useState, useEffect, useContext } from "react";
import { useNavigate,} from 'react-router-dom';
import axios from 'axios';
import '../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../contexts/PageHeaderContext';

const BEMFUBUPage = () => {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Business Entity - MFU - Business Unit');
    setNewButtonLink('/createAssignment');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3003/api/business-entities');
      
      const transformedData = response.data
        .filter(businessEntity => businessEntity.factoryUnitCode || businessEntity.businessUnitCode)
        .map(businessEntity => ({
          id: businessEntity.id,
          beCode: businessEntity.businessEntityCode,
          mfuCode: businessEntity.factoryUnitCode || '',
          buCode: businessEntity.businessUnitCode || ''
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
    if (type === 'be') {
      navigate(`/editAssignment/${code}`);
    } else if (type === 'mfu') {
      navigate(`/factory-units/${code}`);
    } else if (type === 'bu') {
      navigate(`/business-units/${code}`);
    }
  };

  return (
    <div className="organizational-container-table">
      {/* Assignment Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Business Entity Code</th>
              <th className="organizational-table__header">MFU Code</th>
              <th className="organizational-table__header">Business Unit Code</th>
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
            ) : assignments.length > 0 ? (
              assignments.map((assignment) => (
                <tr 
                  key={assignment.id} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick('be', assignment.beCode)}
                    >
                      {assignment.beCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">
                    {assignment.mfuCode ? (
                      <span 
                        className="organizational-table__code-link"
                        onClick={() => handleCodeClick('mfu', assignment.mfuCode)}
                      >
                        {assignment.mfuCode}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="organizational-table__cell">
                    {assignment.buCode ? (
                      <span 
                        className="organizational-table__code-link"
                        onClick={() => handleCodeClick('bu', assignment.buCode)}
                      >
                        {assignment.buCode}
                      </span>
                    ) : '-'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="organizational__no-data-message">
                  No assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BEMFUBUPage;