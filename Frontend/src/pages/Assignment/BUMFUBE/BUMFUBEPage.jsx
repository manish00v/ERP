import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { PageHeaderContext } from '../../../contexts/PageHeaderContext';

import '../../../components/Layout/Styles/OrganizationalTable.css';


const BEMFUBUPage = () => {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock data for business entity assignments
  const mockData = [
    { id: 1, businessEntityCode: 'BE01', mfuCode: 'MFU01', businessUnitCode: 'BU01' },
    { id: 2, businessEntityCode: 'BE02', mfuCode: 'MFU02', businessUnitCode: 'BU02' },
    { id: 3, businessEntityCode: 'BE03', mfuCode: 'MFU03', businessUnitCode: 'BU03' },
  ];

  useEffect(() => {
    setPageTitle('Business Entity - MFU - Business Unit');
    setNewButtonLink('/createAssignment');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  // Simulate data loading
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
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
    navigate(`/editAssignment`);
  };


  return (
    <div className="organizational-container-table">
      {/* Top navigation */}

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
            ) : mockData.length > 0 ? (
              mockData.map((entity) => (
                <tr 
                  key={entity.id} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(entity.businessEntityCode)}
                    >
                      {entity.businessEntityCode}
                    </span>
                  </td>
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
                      onClick={() => handleCodeClick(entity.businessUnitCode)}
                    >
                      {entity.businessUnitCode}
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

export default BEMFUBUPage;