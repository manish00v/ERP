import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import '../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../contexts/PageHeaderContext';

const SoScBuTable = () => {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock data for BU-SO-SC assignments
  const mockData = [
    { id: 1, businessUnitCode: 'BU01', salesOfficeCode: 'SO01', salesChannelCode: 'SC01' },
    { id: 2, businessUnitCode: 'BU02', salesOfficeCode: 'SO02', salesChannelCode: 'SC02' },
    { id: 3, businessUnitCode: 'BU03', salesOfficeCode: 'SO03', salesChannelCode: 'SC03' },
  ];

  useEffect(() => {
    setPageTitle('Business Unit - Sales Office - Sales Channel');
    setNewButtonLink('/createSoScBuAssignment');

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
    navigate(`/editSoScBuAssignment`);
  };


  return (
    <div className="organizational-container-table">

      {/* Assignment Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Business Unit Code</th>
              <th className="organizational-table__header">Sales Office Code</th>
              <th className="organizational-table__header">Sales Channel Code</th>
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
                      onClick={() => handleCodeClick(entity.businessUnitCode)}
                    >
                      {entity.businessUnitCode}
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
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(entity.salesChannelCode)}
                    >
                      {entity.salesChannelCode}
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

export default SoScBuTable;