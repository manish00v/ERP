import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../contexts/PageHeaderContext';

const SoScBuTable = () => {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businessUnits, setBusinessUnits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Business Unit - Sales Office - Sales Channel');
    setNewButtonLink('/createSoScBuAssignment');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/business-units');
        setBusinessUnits(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load data');
        console.error('Error fetching business units:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCodeClick = (businessUnitCode) => {
    navigate(`/editSoScBuAssignment/${businessUnitCode}`);
  };

  return (
    <div className="organizational-container-table">
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
            ) : businessUnits.length > 0 ? (
              businessUnits.map((bu) => (
                <tr key={bu.id} className="organizational-table__row organizational-table__row--body">
                  <td className="organizational-table__cell">
                    <span className="organizational-table__code-link" onClick={() => handleCodeClick(bu.businessUnitCode)}>
                      {bu.businessUnitCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">
                    <span className="organizational-table__code-link" onClick={() => handleCodeClick(bu.businessUnitCode)}>
                      {bu.salesOfficeCode || 'N/A'}
                    </span>
                  </td>
                  <td className="organizational-table__cell">
                    <span className="organizational-table__code-link" onClick={() => handleCodeClick(bu.businessUnitCode)}>
                      {bu.salesChannelId || 'N/A'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="organizational__no-data-message">
                  No business units found
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