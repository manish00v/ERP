import { useState } from 'react';
import { Link } from 'react-router-dom';
import './OrganizationPage.css';

const OrganizationalUnitsPage = () => {
  const [selectedDefineUnit, setSelectedDefineUnit] = useState();
  const [selectedAssignUnit, setSelectedAssignUnit] = useState(null);

  // Define Organizational Units data
  const defineUnits = [
    { id: 'be', name: 'Business Entity - BE', path: '/displayBusinessEntity' },
    { id: 'bu', name: 'Business Unit - BU', path: '/displayBusinessUnit' },
    { id: 'sc', name: 'Sales Channel - SC', path: '/displaySalesChannel' },
    { id: 'so', name: 'Sales Office - SO', path: '/displaySalesOffice' },
    { id: 'st', name: 'Sales Team - ST', path: '/displaySalesTeamPage' },
    { id: 'mfu', name: 'Manufacturing/Factory Unit - MFU', path: '/displayManufacturingFactoryUnitForm' },
    { id: 'su', name: 'Sourcing Unit - SU', path: '/displaySourcingUnit' },
    { id: 'sct', name: 'Sourcing Team - SCT', path: '/displaySourcingTeam' },
    { id: 'iu', name: 'Inventory Unit - IU', path: '/displayInventoryUnit' },
    { id: 'ib', name: 'Inventory Bay - IB', path: '/displayInventoryBay' },
    { id: 'dl', name: 'Delivery Location - DL', path: '/displayDeliveryLocationForm' },
  ];

  // Assign Organizational Units data
  const assignUnits = [
    { id: 'bu-mfu-be', name: 'BU - MFU - BE', path: '/BUMFUBE' },
    { id: 'so-sc-bu', name: 'SO - SC - BU', path: '/SoScBu' },
    { id: 'sp-st-so', name: 'SP - ST - SO ', path: '/SoStSp' },
    { id: 'su-sct-mfu', name: 'SU - SCT - MFU', path: '/MfuSuSct' },
    { id: 'ib-iu-mfu', name: 'IB - IU - MFU', path: '/MfuIuIb' },
    { id: 'mfu-dl', name: 'MFU - DL', path: '/MfuDl' },
  ];

  const handleDefineUnitClick = (unitName) => {
    setSelectedDefineUnit(unitName);
  };

  const handleAssignUnitClick = (unitName) => {
    setSelectedAssignUnit(unitName);
  };



  return (
    <div className="org-units-container">
      

      <div className="org-units-content">
        {/* Define Organizational Units Box */}
        <div className="org-units-box">
          <h2 className="box-title">Define Organizational Units</h2>
          <div className="units-container">
            {defineUnits.map((unit) => (
              <Link 
                key={unit.id}
                to={unit.path}
                className={`unit-link ${selectedDefineUnit === unit.name ? 'selected' : ''}`}
                onClick={() => handleDefineUnitClick(unit.name)}
              >
                {unit.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Assign Organizational Units Box */}
        <div className="org-units-box">
          <h2 className="box-title">Assign Organizational Units</h2>
          <div className="units-container">
            {assignUnits.map((unit) => (
              <Link 
                key={unit.id}
                to={unit.path}
                className={`unit-link ${selectedAssignUnit === unit.name ? 'selected' : ''}`}
                onClick={() => handleAssignUnitClick(unit.name)}
              >
                {unit.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Connector Lines */}
      <div className="connector-lines">
        <div className="horizontal-line"></div>
        <div className="vertical-line"></div>
      </div>
    </div>
  );
};

export default OrganizationalUnitsPage;