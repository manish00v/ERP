import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../components/Layout/Styles/TableStyles.css';
import { PageHeaderContext } from '../../../contexts/PageHeaderContext';


const SoStSpTable = () => {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  const navigate = useNavigate();
  
  // Mock data for SP-ST-SO assignments
  const mockData = [
    { id: 1, salesPersonCode: 'SP01', salesTeamCode: 'ST01', salesOfficeCode: 'SO01' },
    { id: 2, salesPersonCode: 'SP02', salesTeamCode: 'ST02', salesOfficeCode: 'SO02' },
    { id: 3, salesPersonCode: 'SP03', salesTeamCode: 'ST03', salesOfficeCode: 'SO03' },
  ];

    useEffect(() => {
      setPageTitle('Sales Person - Sales Team - Sales Office');
      setNewButtonLink('/createSoStSpAssignment');
  
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
    navigate(`/editSoStSpAssignment`);
  };


  
  return (
    <div className="organizational-container-table">
      
      {/* Assignment Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Sales Person Code</th>
              <th className="organizational-table__header">Sales Team Code</th>
              <th className="organizational-table__header">Sales Office Code</th>
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
                      onClick={() => handleCodeClick(entity.salesPersonCode)}
                    >
                      {entity.salesPersonCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(entity.salesTeamCode)}
                    >
                      {entity.salesTeamCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(entity.salesOfficeCode)}
                    >
                      {entity.salesOfficeCode}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                                <td colSpan="3" className="organizational__no-data-message">No assignments found</td>

              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoStSpTable;