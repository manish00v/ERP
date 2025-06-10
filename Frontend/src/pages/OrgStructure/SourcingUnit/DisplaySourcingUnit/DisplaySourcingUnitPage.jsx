import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';
import axios from "axios";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function DisplaySourcingUnitPage() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [sourcingUnits, setSourcingUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Sourcing Unit');
    setNewButtonLink('/createSourcingUnit');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  const fetchSourcingUnits = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5003/api/sourcing-units");
      setSourcingUnits(response.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch sourcing units');
      setSourcingUnits([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSourcingUnits();
  }, []);

  const handleCodeClick = (SourcingUnitId) => {
    navigate(`/editSourcingUnit/${SourcingUnitId}`);
  };

  return (
    <div className="organizational-container-table">
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Unit Code</th>
              <th className="organizational-table__header">Description</th>
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
            ) : sourcingUnits.length > 0 ? (
              sourcingUnits.map((unit) => (
                <tr
                  key={unit.SourcingUnitId}
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(unit.SourcingUnitId)}
                    >
                      {unit.SourcingUnitId}
                    </span>
                  </td>
                  <td className="organizational-table__cell">
                    {unit.SourcingUnitDesc || '-'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="organizational__no-data-message">No sourcing units found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplaySourcingUnitPage;
