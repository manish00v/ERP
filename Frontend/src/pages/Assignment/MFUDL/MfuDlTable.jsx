import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../contexts/PageHeaderContext';

const DisplayMfuDlTable = () => {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('MFU - Delivery Location Assignment');
    setNewButtonLink('/createMfuDlAssignment');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  const fetchAssignments = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: factoryUnits } = await axios.get('http://localhost:3003/api/factory-units');
      const unitsWithDL = factoryUnits.filter(unit => unit.deliveryLocationCode);

      if (unitsWithDL.length === 0) {
        setAssignments([]);
        setIsLoading(false);
        return;
      }

      const assignmentsWithDetails = await Promise.all(
        unitsWithDL.map(async (unit) => {
          try {
            const { data: deliveryLocation } = await axios.get(
              `http://localhost:3003/api/delivery-locations/${unit.deliveryLocationCode}`
            );
            
            return {
              id: unit.id,
              mfuCode: unit.factoryUnitCode,
              mfuName: unit.factoryUnitName,
              deliveryLocationCode: unit.deliveryLocationCode,
              deliveryLocationName: deliveryLocation.deliveryLocationName || 'N/A'
            };
          } catch (err) {
            console.error(`Failed to fetch delivery location ${unit.deliveryLocationCode}:`, err);
            return {
              ...unit,
              deliveryLocationName: 'Error loading name'
            };
          }
        })
      );

      setAssignments(assignmentsWithDetails);
    } catch (err) {
      console.error('Failed to fetch factory units:', err);
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleEditMfu = (factoryUnitCode) => {
    navigate(`/editMfuDlAssignment/${factoryUnitCode}`);
  };

  return (
    <div className="organizational-container-table">
      {/* Assignment Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">MFU Code</th>
              <th className="organizational-table__header">MFU Name</th>
              <th className="organizational-table__header">Delivery Location Code</th>
              <th className="organizational-table__header">Delivery Location Name</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="organizational__loading-message">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4" className="organizational__error-message">
                  Error: {error}
                </td>
              </tr>
            ) : assignments.length > 0 ? (
              assignments.map((assignment) => (
                <tr 
                  key={`${assignment.mfuCode}-${assignment.deliveryLocationCode}`} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleEditMfu(assignment.mfuCode)}
                    >
                      {assignment.mfuCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{assignment.mfuName}</td>
                  <td className="organizational-table__cell">{assignment.deliveryLocationCode}</td>
                  <td className="organizational-table__cell">{assignment.deliveryLocationName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="organizational__no-data-message">
                  No delivery location assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayMfuDlTable;