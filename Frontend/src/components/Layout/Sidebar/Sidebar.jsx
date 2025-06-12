import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import galvinusLogo from "../../../assets/galvinus_logo.jpeg";
import "./Sidebar.css";
import { TipsContext } from "../../../contexts/TipsContext";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeChild, setActiveChild] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const menuRef = useRef(null);
  const { setTips } = useContext(TipsContext);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
        setActiveChild(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleChildClick = (childName) => {
    setActiveChild(childName);
  };
  
  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
    if (menuName !== "admin") {
      setActiveChild(null);
    }
  };

  const toggleSubmenu = (submenu) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="navbar-logo-container">
        <img src={galvinusLogo} alt="galvinus-logo" className="navbar-logo-img" />
        <span className="navbar-logo-text">Galvinus</span>
      </div>


  {/* Search bar */}
  <div className="ssearch-container">
        <input type="text" placeholder="Cockpit search" className="ssearch-input" />
        <button className="ssearch-button">
          <i className="fas fa-search"></i>
        </button>
      </div>
      
      {/* Home button at the top */}
      <div className="home-button-sidebar" onClick={() => setTips(true)}>
        <Link to="/home" className="home-link">
          <i className="fas fa-home home-icon"></i>
          <span>Home</span>
        </Link>
      </div>
      
    

      {/* Main navigation */}
<ul className="main-menu">
  <li 
    className={`menu-item ${activeChild === "organization" ? "active-menu-parent" : ""}`}
    ref={menuRef}
  >
    <div className="menu-button-container">
      <Link 
        to="/" 
        className="menu-button-link"
        onClick={(e) => {
          // Only prevent default if we want the link to not navigate
          // e.preventDefault();
          handleMenuClick("admin");
        }}
      >
        <div className="menu-left">
          <i className="fas fa-user-shield"></i>
          <span>Admin</span>
        </div>
        <i className={`fas ${activeMenu === "admin" ? "fa-chevron-down" : "fa-chevron-right"}`}></i>
      </Link>
    </div>

    {activeMenu === "admin" && (
      <ul className="dropdown-menu">
        <li>
          <Link
            to="/organizationPage"
            className={activeChild === "organization" ? "active-child" : ""}
            onClick={() => handleChildClick("organization")}
          >
            <span>Organization</span>
            <i className="fas fa-chevron-right"></i>
          </Link>
        </li>

 <li>
        <Link
            to="/masterPage"
            className={activeChild === "master" ? "active-child" : ""}
            onClick={() => handleChildClick("master")}
          >
            <span>Master Data</span>
            <i className="fas fa-chevron-right"></i>
          </Link>
        </li>

      </ul>

      

    )}
  </li>
</ul>
    </aside>
  );
};

export default Sidebar;