import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Settings from "../../../header/Setting/Setting";

const Navbar = () => {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchType, setSearchType] = useState("BE");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [availableSearchOptions, setAvailableSearchOptions] = useState([]);

  // Entity configuration with all possible routes
  const entityConfig = {
    BE: {
      label: "Business Entity",
      routes: ["displaybusinessentity", "be"]
    },
    BU: {
      label: "Business Unit",
      routes: ["displaybusinessunit", "bu"]
    },
    SC: {
      label: "Sales Channel",
      routes: ["displaysaleschannel", "sc"]
    },
    SO: {
      label: "Sales Office",
      routes: ["displaysalesoffice", "so"]
    },
    ST: {
      label: "Sales Team",
      routes: ["displaysalesteampage", "st"]
    },
    MFU: {
      label: "Factory Unit",
      routes: ["displaymanufacturingfactoryunitform", "mfu"]
    },
    SCT: {
      label: "Sourcing Team",
      routes: ["displaysourcingteam", "sct"]
    },
    IU: {
      label: "Inventory Unit",
      routes: ["displayinventoryunit", "iu"]
    },
    IB: {
      label: "Inventory Bay",
      routes: ["displayinventorybay", "ib"]
    },
    DL: {
      label: "Delivery Location",
      routes: ["displaydeliverylocationform", "dl"]
    },
    SU: {
      label: "Sourcing Unit",
      routes: ["displaysourcingunit", "su"]
    }
  };

  // Convert entityConfig to allSearchOptions format
  const allSearchOptions = Object.entries(entityConfig).map(([value, config]) => ({
    value,
    label: config.label
  }));

  useEffect(() => {
    const pathSegments = location.pathname.toLowerCase().split('/');
    const primaryPath = pathSegments[1] || '';
    
    console.log('Current path segments:', pathSegments); // Debugging

    // Check if we're on the organization page
    if (primaryPath === 'organizationpage' || primaryPath === 'org') {
      setAvailableSearchOptions(allSearchOptions);
      setSearchType("BE");
      return;
    }

    // Find the matching entity
    const matchedEntity = Object.entries(entityConfig).find(([_, config]) =>
      config.routes.some(route => primaryPath.includes(route))
    );

    if (matchedEntity) {
      const [entityValue] = matchedEntity;
      setAvailableSearchOptions(allSearchOptions.filter(opt => opt.value === entityValue));
      setSearchType(entityValue);
    } else {
      // Default case for all other pages
      setAvailableSearchOptions(allSearchOptions);
    }
  }, [location.pathname]);

  // Rest of your component remains the same...
  const toggleSettings = () => {
    setSettingsOpen((prevState) => !prevState);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  const toggleDropdown = () => {
    if (availableSearchOptions.length > 1) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
    setIsDropdownOpen(false);
  };

  const handleCloseCockpit = () => {
    console.log('Closing cockpit');
  };

  return (
    <>
      <nav className="navbar-main">
        <div className="navbar-right-section">
          <div className="navbar-search-box">
            {availableSearchOptions.length > 1 ? (
              <div className="search-type-dropdown">
                <button className="search-type-button" onClick={toggleDropdown}>
                  {searchType}
                  <i className={`fas fa-chevron-${isDropdownOpen ? "up" : "down"}`}></i>
                </button>
                {isDropdownOpen && (
                  <div className="search-type-options">
                    {availableSearchOptions.map((option) => (
                      <div
                        key={option.value}
                        className="search-type-option"
                        onClick={() => handleSearchTypeChange(option.value)}
                      >
                        <span className="option-value">{option.value}</span>
                        <span className="option-label">{option.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="search-type-static">
                {availableSearchOptions[0]?.value || "BE"}
              </div>
            )}
            <input
              type="text"
              className="navbar-input-search"
              placeholder={`Search ${allSearchOptions.find(opt => opt.value === searchType)?.label || "Business Entity"}...`}
            />
            <button className="navbar-btn-search">
              <i className="fas fa-search"></i>
            </button>
          </div>

          <div className="navbar-icons-container">
            <div className="close-button-container">
              <button className="close-cockpit-btn" onClick={handleCloseCockpit}>
                Close Cockpit
              </button>
            </div>

            <Link to="/notification" title="Notifications" className="navbar-icon-link">
              <i className="fa-solid fa-bell"></i>
            </Link>
            <button
              className="navbar-icon-button"
              title="Settings"
              onClick={toggleSettings}
            >
              <i className="fas fa-gear"></i>
            </button>
            <Link to="/profile" title="Your Profile" className="navbar-icon-link">
              <i className="fas fa-user-circle"></i>
            </Link>
          </div>
        </div>
      </nav>

      <Settings isOpen={settingsOpen} onClose={closeSettings} />
    </>
  );
};

export default Navbar;