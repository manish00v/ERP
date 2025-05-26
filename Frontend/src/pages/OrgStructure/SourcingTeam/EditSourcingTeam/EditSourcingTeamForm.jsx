import { useState, useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { FaEdit, FaSave } from "react-icons/fa";

export default function EditSourcingTeamForm() {
        const { setGoBackUrl } = useContext(FormPageHeaderContext);
    
  const [formData, setFormData] = useState({
    teamId: "",
    teamName: "",
    teamType: "",
    countryCode: "",
    pinCode: "",
    phoneNumber: "",
    landlineNumber: "",
    email: ""
  });

  useEffect(() => {
    setGoBackUrl("/displaySourcingTeam");
    // Simulate loading existing data
    const mockData = {
      teamId: "ABC1",
      teamName: "Sample Business",
      teamType: "individuval",
      countryCode: "+91",
      pinCode: "400001",
      phoneNumber: "",
      landlineNumber: "",
      email: ""
    };
    setFormData(mockData);
    setOriginalData(mockData);
  }, [setGoBackUrl]);

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({});

  const teamTypes = ["Individual", "Group"];


  const validateField = (name, value) => {
    switch (name) {
      case "teamId":
        if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
          return "Team ID must be exactly 4 alphanumeric characters";
        }
        break;
      case "teamName":
        if (value.length > 30 || !/^[a-zA-Z0-9 ]+$/.test(value)) {
          return "Team Name must be alphanumeric and up to 30 characters";
        }
        break;
      case "teamType":
        if (!value) return "Team type is required";
        break;
      case "countryCode":
        if (value.length > 5 || !/^[0-9+\-() ]+$/.test(value)) {
          return "Country code must be numeric with special characters (max 5 chars)";
        }
        break;
      case "pinCode":
        if (!/^\d{6}$/.test(value)) return "Pin code must be exactly 6 digits";
        break;
      case "phoneNumber":
        if (!/^\d{10,12}$/.test(value)) return "Phone number must be 10-12 digits";
        break;
      case "landlineNumber":
        if (value && !/^\d{10,12}$/.test(value)) {
          return "Landline number must be 10-12 digits";
        }
        break;
      case "email":
        if (value.length > 20 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Email must be valid and up to 20 characters";
        }
        break;
      default:
        return "";
    }
    return "";
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

    // If country changes, reset city
    if (name === "country") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        city: "" // Reset city when country changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
      alert("Sourcing Team updated successfully!");
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
              form="sourcingTeamForm" 
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

   
      <form id="sourcingTeamForm" onSubmit={handleSubmit}>
          {/* Sourcing Team Details */}
          <div className="header-box">
            <h2>Sourcing Team Details</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="teamId">Sourcing Team Code*</label>
                <span className="info-icon-tooltip">
                  <i className="fas fa-info-circle" />
                  <span className="tooltip-text">
                    1- Sourcing Team Code must be exactly 4 digits. <br />
                    2- Sourcing Team Code must be unique. <br />
                    3- Sourcing TeamCode must not contain any special characters.  <br />
                    4- Sourcing Team Code must not contain any spaces. <br /> 
                    5- Sourcing Team Code once created then it can be not delete. <br />
                  </span>
                </span>
                <input
                  type="text"
                  id="teamId"
                  name="teamId"
                  value={formData.teamId}
                  onChange={handleChange}
                  maxLength={4}
                  required
                  readOnly={!isEditing}
                  className={!isEditing ? "read-only" : ""}
                />
                {errors.teamId && (
                  <span className="error">{errors.teamId}</span>
                )}
              </div>
              <div className="data">
                <label htmlFor="teamDescription">Sourcing Team Description*</label>
                <span className="info-icon-tooltip">
                  <i className="fas fa-info-circle" />
                  <span className="tooltip-text">
                    Sourcing Team Name must be alphanumeric and up to 30 characters.
                  </span>
                </span>
                <input
                  type="text"
                  id="teamDescription"
                  name="teamDescription"
                  value={formData.teamDescription}
                  onChange={handleChange}
                  maxLength={30}
                  required
                  readOnly={!isEditing}
                  className={!isEditing ? "read-only" : ""}
                />
                {errors.teamDescription && (
                  <span className="error">{errors.teamDescription}</span>
                )}
              </div>
          </div>
        </div>
          
        <div className="item-box">
          <h2>Contact Details</h2>
          <div className="data-container">
          <div className="data">
              <label htmlFor="teamType">Team Type*</label>
              <select
                id="teamType"
                name="teamType"
                value={formData.teamType}
                onChange={handleChange}
                required
                placeholder="Individual"
                disabled={!isEditing}
                className={!isEditing ? "read-only" : ""}
              >
                <option value="">Select type</option>
                {teamTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
                
              </select>
              
              {errors.teamType && ( <span className="error">{errors.teamType}</span>)}
            </div>

            <div className="data">
              <label>Country Code*</label>
              <input
                type="text"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                maxLength={12}
                required
                placeholder="+91"
                readOnly={!isEditing}
                className={!isEditing ? "read-only" : ""}
              />
              {errors.countryCode && <span className="error">{errors.countryCode}</span>}
            </div>
         
            <div className="data">
              <label>Phone Number*</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength={12}
                required
                placeholder="10-12 digits"
                readOnly={!isEditing}
                className={!isEditing ? "read-only" : ""}
              />
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
            </div>

            <div className="data">
              <label>Landline Number</label>
              <input
                type="text"
                name="landlineNumber"
                value={formData.landlineNumber}
                onChange={handleChange}
                maxLength={12}
                placeholder="10-12 digits"
                readOnly={!isEditing}
                className={!isEditing ? "read-only" : ""}
              />
              {errors.landlineNumber && <span className="error">{errors.landlineNumber}</span>}
            </div>

            <div className="data">
              <label>E-mail*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={20}
                required
                placeholder="E-mail"
                readOnly={!isEditing}
                className={!isEditing ? "read-only" : ""}
              />
              {errors.email && <span className="error">{errors.email}</span>}
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