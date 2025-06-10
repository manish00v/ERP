import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Settings from "../../../header/Setting/Setting";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchType, setSearchType] = useState("BE");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [availableSearchOptions, setAvailableSearchOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Entity configuration with all possible routes
  const entityConfig = {
    BE: {
      label: "Business Entity",
      routes: ["displaybusinessentity", "be"],
      searchEndpoint: "http://localhost:3003/api/business-entities",
      searchByCode: true,
      codeField: "businessEntityCode",
      nameField: "businessEntityDesc"
    },
    BU: {
      label: "Business Unit",
      routes: ["displaybusinessunit", "bu"],
      searchEndpoint: "http://localhost:3003/api/business-units",
      searchByCode: true,
      codeField: "businessUnitCode",
      nameField: "businessUnitDesc"
    },
    SC: {
      label: "Sales Channel",
      routes: ["displaysaleschannel", "sc"],
      searchEndpoint: "http://localhost:3003/api/sales-channels",
      searchByCode: true,
      codeField: "salesChannelCode",
      nameField: "salesChannelName"
    },
    SO: {
      label: "Sales Office",
      routes: ["displaysalesoffice", "so"],
      searchEndpoint: "http://localhost:3003/api/sales-offices/",
      searchByCode: true,
      codeField: "salesOfficeCode",
      nameField: "salesOfficeName"
    },
    ST: {
      label: "Sales Team",
      routes: ["displaysalesteampage", "st"],
      searchEndpoint: "http://localhost:3003/api/sales-teams",
      searchByCode: true,
      codeField: "salesTeamCode",
      nameField: "salesTeamName"
    },
    MFU: {
      label: "Factory Unit",
      routes: ["displaymanufacturingfactoryunitform", "mfu"],
      searchEndpoint: "http://localhost:3003/api/factory-units",
      searchByCode: true,
      codeField: "factoryUnitCode",
      nameField: "factoryUnitName"
    },
    SCT: {
      label: "Sourcing Team",
      routes: ["displaysourcingteam", "sct"],
      searchEndpoint: "http://localhost:3003/api/business-units",
      searchByCode: true,
      codeField: "businessUnitCode",
      nameField: "businessUnitDesc"
    },
    IU: {
      label: "Inventory Unit",
      routes: ["displayinventoryunit", "iu"],
      searchEndpoint: "http://localhost:3003/api/business-units",
      searchByCode: true,
      codeField: "businessUnitCode",
      nameField: "businessUnitDesc"
    },
    IB: {
      label: "Inventory Bay",
      routes: ["displayinventorybay", "ib"],
      searchEndpoint: "http://localhost:3003/api/business-units",
      searchByCode: true,
      codeField: "businessUnitCode",
      nameField: "businessUnitDesc"
    },
    DL: {
      label: "Delivery Location",
      routes: ["displaydeliverylocationform", "dl"],
       searchEndpoint: "http://localhost:3003/api/delivery-locations",
      searchByCode: true,
      codeField: "deliveryLocationCode",
      nameField: "deliveryLocationName"
    },
    SU: {
      label: "Sourcing Unit",
      routes: ["displaysourcingunit", "su"],
      searchEndpoint: "http://localhost:3003/api/business-units",
      searchByCode: true,
      codeField: "businessUnitCode",
      nameField: "businessUnitDesc"
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setShowResults(false);
      return;
    }
    
    const currentEntity = entityConfig[searchType];
    
    if (!currentEntity?.searchEndpoint) {
      alert("Search functionality not implemented for this entity yet");
      return;
    }

    setIsSearching(true);
    setShowResults(false);
    
    try {
      let url = currentEntity.searchEndpoint;
      let response;
      
      if (currentEntity.searchByCode) {
        // Search by exact code match
        url += `/${searchQuery.trim()}`;
        response = await axios.get(url);
        
        if (response.data) {
          setSearchResults([response.data]);
        } else {
          setSearchResults([]);
          alert("No results found");
        }
      } else {
        // Search with query parameters (for future implementation)
        response = await axios.get(url, {
          params: { search: searchQuery.trim() }
        });
        setSearchResults(response.data || []);
        
        if (response.data.length === 0) {
          alert("No results found");
        }
      }
      
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      if (error.response?.status === 404) {
        setSearchResults([]);
        alert("No results found");
      } else {
        alert("Error searching. Please try again.");
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (result) => {
    const currentEntity = entityConfig[searchType];
    
    if (currentEntity) {
      // Navigate to the edit page for the selected result
      if (searchType === "BE") {
        navigate(`/editBusinessEntity/${result.businessEntityCode}`);
      } else if (searchType === "BU") {
        navigate(`/editBusinessUnit/${result.businessUnitCode}`);
      }
      else if (searchType === "SO") {
        navigate(`/editSalesOffice/${result.salesOfficeCode}`);
      }
      else if (searchType === "SC") {
        navigate(`/editSalesChannel/${result.salesChannelCode}`);
      }
      else if (searchType === "ST") {
        navigate(`/editSalesTeamForm/${result.salesTeamCode}`);
      }
      else if (searchType === "MFU") {
        navigate(`/editManufacturingFactoryUnitForm/${result.factoryUnitCode}`);
      }
      else if (searchType === "SCT") {
        navigate(`/edit-business-unit/${result.businessUnitCode}`);
      }
      else if (searchType === "IU") {
        navigate(`/edit-business-unit/${result.businessUnitCode}`);
      }
      else if (searchType === "IB") {
        navigate(`/edit-business-unit/${result.businessUnitCode}`);
      }
      else if (searchType === "DL") {
        navigate(`/editDeliveryLocationForm/${result.deliveryLocationCode}`);
      }

      // Add other entity types as needed
    }
    
    setShowResults(false);
    setSearchQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
            />
            <button 
              className="navbar-btn-search" 
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-search"></i>
              )}
            </button>
            
            {/* Search results dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="search-results-dropdown">
                {searchResults.map((result) => {
                  const currentEntity = entityConfig[searchType];
                  const code = currentEntity?.codeField ? result[currentEntity.codeField] : '';
                  const name = currentEntity?.nameField ? result[currentEntity.nameField] : '';
                  
                  return (
                    <div 
                      key={code || result.id}
                      className="search-result-item"
                      onClick={() => handleResultClick(result)}
                    >
                      {code && (
                        <>
                          <div className="result-code">{code}</div>
                          <div className="result-name">{name}</div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
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