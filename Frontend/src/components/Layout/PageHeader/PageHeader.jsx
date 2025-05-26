import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PageHeader.css";
import { PageHeaderContext } from "../../../contexts/PageHeaderContext";

const PageHeader = () => {
  const { pageTitle, pageSubtitle, newButtonLink } = useContext(PageHeaderContext);
  const navigate = useNavigate();

  if (!pageTitle) return null;

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="page-header-container">
      <div className="page-header-content">
        <div className="page-title-section" onClick={handleBackClick}>
          <h1 className="page-title">
            <span className="back-arrow">{"<"}</span>
            {pageTitle}
          </h1>
          {pageSubtitle && (
            <div className="subtitle-container">
              <span className="page-subtitle">{pageSubtitle}</span>
            </div>
          )}
        </div>
        {newButtonLink && (
          <Link to={newButtonLink} className="new-button-page-header">
            New
          </Link>
        )}
      </div>
    </div>
  );
};

export default PageHeader;