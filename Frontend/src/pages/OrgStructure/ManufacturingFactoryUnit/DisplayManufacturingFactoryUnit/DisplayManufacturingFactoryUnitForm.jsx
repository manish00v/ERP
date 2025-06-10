import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../../../components/Layout/Styles/OrganizationalTable.css';
import { PageHeaderContext } from '../../../../contexts/PageHeaderContext';

function ManufacturingFactoryUnitTable() {
  const { setPageTitle, setNewButtonLink } = useContext(PageHeaderContext);
  const [factoryUnits, setFactoryUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Manufacturing Factory Unit');
    setNewButtonLink('/createManufacturingFactoryUnitForm');

    return () => {
      setPageTitle('');
      setNewButtonLink('/organizationPage');
    };
  }, [setPageTitle, setNewButtonLink]);

  const fetchFactoryUnits = async (search = "") => {
    setIsLoading(true);
    setError(null);
    
    try {
      let url = "http://localhost:3003/api/factory-units";
      
      // If search query provided, add it as a query parameter
      if (search) {
        url += `?search=${encodeURIComponent(search)}`;
      }

      const response = await axios.get(url);
      setFactoryUnits(response.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch manufacturing factory units');
      setFactoryUnits([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFactoryUnits();
  }, []);


  const handleCodeClick = (code) => {
    navigate(`/editManufacturingFactoryUnitForm/${code}`);
  };

  return (
    <div className="organizational-container-table">
      {/* Search Bar */}
     
  

      {/* Manufacturing Factory Unit Table */}
      <div className="organizational__table-wrapper">
        <table className="organizational-table">
          <thead>
            <tr>
              <th className="organizational-table__header">Factory Unit Code</th>
              <th className="organizational-table__header">Factory Unit Name</th>
              <th className="organizational-table__header">City</th>
              <th className="organizational-table__header">Region</th>
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
            ) : factoryUnits.length > 0 ? (
              factoryUnits.map((unit) => (
                <tr 
                  key={unit.factoryUnitCode} 
                  className="organizational-table__row organizational-table__row--body"
                >
                  <td className="organizational-table__cell">
                    <span 
                      className="organizational-table__code-link"
                      onClick={() => handleCodeClick(unit.factoryUnitCode)}
                    >
                      {unit.factoryUnitCode}
                    </span>
                  </td>
                  <td className="organizational-table__cell">{unit.factoryUnitName || '-'}</td>
                  <td className="organizational-table__cell">{unit.city || '-'}</td>
                  <td className="organizational-table__cell">{unit.region || '-'}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="organizational__no-data-message">
                  {searchQuery ? "No matching factory units found" : "No factory units available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManufacturingFactoryUnitTable;