
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import '../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../contexts/PageHeaderContext';

const MfuDlTable = () => {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock data for MFU-Delivery Location assignments
  const mockData = [
    { id: 1, mfuCode: 'MFU01', deliveryLocationCode: 'DL01' },
    { id: 2, mfuCode: 'MFU02', deliveryLocationCode: 'DL02' },
    { id: 3, mfuCode: 'MFU03', deliveryLocationCode: 'DL03' },
  ];

  useEffect(() => {
    setPageTitle('MFU - Delivery Location Assignment');
    setNewButtonLink('/createMfuDlAssignment');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  // Simulate data loading
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
    navigate(`/editMfuDlAssignment`);
  };

  return (
    <div className="organizational-container-table">
      

      {/* Assignment Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Manufacturing Factory Unit Code</th>
              <th className="organizational-table__header">Delivery Location Code</th>
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
                      onClick={() => handleCodeClick(entity.deliveryLocationCode)}
                    >
                      {entity.deliveryLocationCode}
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

export default MfuDlTable;