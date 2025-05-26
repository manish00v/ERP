import Navbar from "./Layout/Navbar/Navbar";
import Sidebar from "./Layout/Sidebar/Sidebar";
import PageHeader from "../components/Layout/PageHeader/PageHeader";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        {/* PageHeader will be rendered here when pageTitle is set */}
        <PageHeader />
        <div className="content-wrapper">
          <Outlet />
        </div>
        {/* FormPageHeader for form actions at the bottom */}
      </div>
    </div>
  );
};

export default Layout;