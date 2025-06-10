import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../contexts/PageHeaderContext';

const MfuIuIbTable = () => {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('MFU - Inventory Unit - Inventory Bay');
    setNewButtonLink('/createMfuIuIbAssignment');

    return () => {
      setPageTitle('');
      setNewButtonLink(null);
    };
  }, [setPageTitle, setNewButtonLink]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch factory units with Inventory relationships
        const response = await axios.get('http://localhost:3003/api/factory-units', {
        
        });

        // Transform the data to match our table structure
        const transformedData = response.data
          .filter(factoryUnit => factoryUnit.InventoryUnitId || factoryUnit.InventoryBayId)
          .map(factoryUnit => ({
            id: factoryUnit.id,
            mfuCode: factoryUnit.factoryUnitCode,
            InventoryUnitCode: factoryUnit.InventoryUnitId,
            InventoryUnitDesc: factoryUnit.InventoryUnit?.InventoryUnitDesc || '',
            InventoryBayCode: factoryUnit.InventoryBayId,
            InventoryBayDesc: factoryUnit.InventoryBay?.InventoryBayDesc || ''
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
      navigate(`/editMfuIuIbAssignment/${code}`);
    } else if (type === 'iu') {
      navigate(`/inventory-units/${code}`);
    } else if (type === 'ib') {
      navigate(`/inventory-bays/${code}`);
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
              <th className="organizational-table__header">Inventory Unit Code</th>
              <th className="organizational-table__header">Inventory Bay Code</th>
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
                    {assignment.InventoryUnitCode ? (
                      <span 
                        className="organizational-table__code-link"
                        onClick={() => handleCodeClick('iu', assignment.InventoryUnitCode)}
                      >
                        {assignment.InventoryUnitCode}
                      </span>
                    ) : '-'}
                  </td>
              
                  <td className="organizational-table__cell">
                    {assignment.InventoryBayCode ? (
                      <span 
                        className="organizational-table__code-link"
                        onClick={() => handleCodeClick('ib', assignment.InventoryBayCode)}
                      >
                        {assignment.InventoryBayCode}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="organizational-table__cell">
                    {assignment.InventoryBayDesc || '-'}
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

export default MfuIuIbTable;