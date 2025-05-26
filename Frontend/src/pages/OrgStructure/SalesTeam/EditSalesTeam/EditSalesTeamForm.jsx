import { useState, useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { FaEdit, FaSave } from "react-icons/fa";

export default function EditSalesTeamForm() {
    const { setGoBackUrl } = useContext(FormPageHeaderContext);
    
    const [formData, setFormData] = useState({
        teamCode: "",
        teamName: "",
       
    });

    const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        setGoBackUrl("/displaySalesTeamPage");

        const mockData = {
            teamCode: "ABC1",
            teamName: "Sample Business",
         
          };
          setFormData(mockData);
          setOriginalData(mockData);
    }, [setGoBackUrl]);

    const validateField = (name, value) => {
        switch (name) {
            case 'teamCode':
                if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
                    return 'Sales Team Code must be exactly 4 alphanumeric characters';
                }
                break;
            case 'teamName':
                if (value.length > 30 || !/^[a-zA-Z0-9 ]+$/.test(value)) {
                    return 'Sales Team Name must be alphanumeric and up to 30 characters';
                }
                break;
           
            default:
                return '';
        }
        return '';
    };

    const handleChange = (e) => {
        if (!isEditing) return;
        
        const { name, value } = e.target;
    
        // Validate the field
        const error = validateField(name, value);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
    
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        let formValid = true;
        const newErrors = {};
    
        Object.keys(formData).forEach((key) => {
          const error = validateField(key, formData[key]);
          if (error) {
            newErrors[key] = error;
            formValid = false;
          }
        });
    
        setErrors(newErrors);
    
        if (formValid) {
          console.log("Form data valid, ready to submit:", formData);
          alert("Sales Team updated successfully!");
          setOriginalData(formData);
          setIsEditing(false);
        } else {
          alert("Please fix the errors in the form before submitting.");
        }
      };
    
      const handleEdit = () => {
        setIsEditing(true);
      };
    
    return (
        <>
      <div className="container">
        <div className="edit-controls">
          {isEditing ? (
            <button 
              type="submit" 
              form="salesTeamForm" 
              className="save-button-edit-page"
            >
              <FaSave /> Save
            </button>
          ) : (
            <button 
              type="button" 
              className="edit-button-edit-page" 
              onClick={handleEdit}
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>
        
        <form id="salesTeamForm" onSubmit={handleSubmit}>
          {/* Sales Team Details */}
          <div className="header-box">
            <h2>Sales Team Details</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="teamCode">Sales Team Code*</label>
                <span className="info-icon-tooltip">
                  <i className="fas fa-info-circle" />
                  <span className="tooltip-text">
                    1- Sales Team Code must be exactly 4 digits. <br />
                    2- Sales Team Code must be unique. <br />
                    3- Sales Team Code must not contain any special characters.  <br />
                    4- Sales Team Code must not contain any spaces. <br /> 
                    5- Sales Team Code once created then it can be not delete. <br />
                  </span>
                </span>
                <input
                  type="text"
                  id="teamCode"
                  name="teamCode"
                  value={formData.entityCode}
                  onChange={handleChange}
                  maxLength={4}
                  required
                  readOnly={!isEditing}
                  className={!isEditing ? "read-only" : ""}
                />
                {errors.teamCode && (
                  <span className="error">{errors.teamCode}</span>
                )}
              </div>
              <div className="data">
                <label htmlFor="teamName">Sales Team Name*</label>
                <span className="info-icon-tooltip">
                  <i className="fas fa-info-circle" />
                  <span className="tooltip-text">
                  Sales Team Name must be alphanumeric and up to 30 characters.
                  </span>
                </span>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  maxLength={30}
                  required
                  readOnly={!isEditing}
                  className={!isEditing ? "read-only" : ""}
                />
                {errors.teamName && (
                  <span className="error">{errors.teamName}</span>
                )}
              </div>
            </div>
          </div>
                    </form>
                </div>
                <FormPageHeader 
        onCancel={() => {
          if (isEditing) {
            setFormData(originalData);
            setErrors({});
            setIsEditing(false);
          }
        }}
      />
        </>
    );
}