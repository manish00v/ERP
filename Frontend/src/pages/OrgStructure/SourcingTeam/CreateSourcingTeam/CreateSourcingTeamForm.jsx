import { useState, useEffect } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

// API endpoints
const API_BASE_URL = "http://localhost:5003/api";
const SOURCING_TEAMS_URL = `${API_BASE_URL}/sourcing-teams`;
const CHECK_TEAM_ID_URL = (teamId) => `${API_BASE_URL}/sourcing-teams/check-id/${teamId}`;

export default function CreateSourcingTeamForm() {
  const [formData, setFormData] = useState({
    SourcingTeamId: "",
    SourcingTeamName: "",
    TeamType: "",
    CountryCode: "",
    PinCode: "",
    PhoneNumber: "",
    LandlineNumber: "",
    Email: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamIdExists, setTeamIdExists] = useState(false);
  
  const teamTypes = ["Individual", "Group"];

  // Check if team ID exists whenever it changes
  useEffect(() => {
    const checkTeamId = async () => {
      if (formData.SourcingTeamId.length === 4) {
        try {
          const response = await fetch(CHECK_TEAM_ID_URL(formData.SourcingTeamId));
          if (!response.ok) {
            throw new Error('Failed to check team ID');
          }
          const data = await response.json();
          setTeamIdExists(data.exists);
          if (data.exists) {
            setErrors(prev => ({
              ...prev,
              SourcingTeamId: "Sourcing Team ID already exists"
            }));
          }
        } catch (error) {
          console.error("Error checking team ID:", error);
        }
      }
    };
    
    checkTeamId();
  }, [formData.SourcingTeamId]);

  const validateField = (name, value) => {
    switch (name) {
      case "SourcingTeamId":
        if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
          return "Sourcing Team ID must be exactly 4 alphanumeric characters";
        }
        if (teamIdExists) {
          return "Sourcing Team ID already exists";
        }
        break;
      case "SourcingTeamName":
        if (value.length > 30 || !/^[a-zA-Z0-9 ]+$/.test(value)) {
          return "Sourcing Team Description must be alphanumeric and up to 30 characters";
        }
        break;
      case "TeamType":
        if (!value) {
          return "Sourcing Team type is required";
        }
        break;
      case "CountryCode":
        if (value.length > 5 || !/^[0-9+\-() ]+$/.test(value)) {
          return "Country code must be numeric with special characters (max 5 chars)";
        }
        break;
      case "PinCode":
        if (!/^\d{6}$/.test(value)) {
          return "Pin code must be exactly 6 digits";
        }
        break;
      case "PhoneNumber":
        if (!/^\d{10,12}$/.test(value)) {
          return "Phone number must be 10-12 digits";
        }
        break;
      case "LandlineNumber":
        if (value && !/^\d{10,12}$/.test(value)) {
          return "Landline number must be 10-12 digits";
        }
        break;
      case "Email":
        if (value.length > 20 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Email must be valid and up to 20 characters";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleCancel = () => {
    window.location.href = '/displaySourcingTeam'; 
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the field
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields before submission
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

    if (!formValid) {
      setIsSubmitting(false);
      alert("Please fix the errors in the form before submitting.");
      return;
    }

    try {
      const response = await fetch(SOURCING_TEAMS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create sourcing team');
      }

      const createdTeam = await response.json();
      alert(`Sourcing Team ${createdTeam.SourcingTeamId} created successfully!`);
      
      // Reset form after successful submission
      setFormData({
        SourcingTeamId: "",
        SourcingTeamName: "",
        TeamType: "",
        CountryCode: "",
        PinCode: "",
        PhoneNumber: "",
        LandlineNumber: "",
        Email: ""
      });
    } catch (error) {
      console.error("Error creating sourcing team:", error);
      alert(`Failed to create sourcing team: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Sourcing Team Details */}
          <div className="header-box">
            <h2>Sourcing Team Details</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="SourcingTeamId">Sourcing Team ID*</label>
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
                  id="SourcingTeamId"
                  name="SourcingTeamId"
                  value={formData.SourcingTeamId}
                  onChange={handleChange}
                  maxLength={4}
                  required
                />
                {errors.SourcingTeamId && (
                  <span className="error">{errors.SourcingTeamId}</span>
                )}
              </div>
              <div className="data">
                <label htmlFor="SourcingTeamName">Sourcing Team Description*</label>
                <span className="info-icon-tooltip">
                  <i className="fas fa-info-circle" />
                  <span className="tooltip-text">
                    Sourcing Team Name must be alphanumeric and up to 30 characters.
                  </span>
                </span>
                <input
                  type="text"
                  id="SourcingTeamName"
                  name="SourcingTeamName"
                  value={formData.SourcingTeamName}
                  onChange={handleChange}
                  maxLength={30}
                  required
                />
                {errors.SourcingTeamName && (
                  <span className="error">{errors.SourcingTeamName}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="item-box">
            <h2>Other Details</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="TeamType">Sourcing Team Type*</label>
                <select
                  id="TeamType"
                  name="TeamType"
                  value={formData.TeamType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select team type</option>
                  {teamTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.TeamType && (
                  <span className="error">{errors.TeamType}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="PinCode">Pin Code*</label>
                <input
                  type="text"
                  id="PinCode"
                  name="PinCode"
                  value={formData.PinCode}
                  onChange={handleChange}
                  maxLength={6}
                  required
                />
                {errors.PinCode && (
                  <span className="error">{errors.PinCode}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="CountryCode">Country Code*</label>
                <input
                  type="text"
                  id="CountryCode"
                  name="CountryCode"
                  value={formData.CountryCode}
                  onChange={handleChange}
                  maxLength={5}
                  required
                  placeholder="e.g., +91"
                />
                {errors.CountryCode && (
                  <span className="error">{errors.CountryCode}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="PhoneNumber">Phone Number*</label>
                <input
                  type="text"
                  id="PhoneNumber"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  maxLength={12}
                  required
                  placeholder="10-12 digits"
                />
                {errors.PhoneNumber && (
                  <span className="error">{errors.PhoneNumber}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="LandlineNumber">Landline Number</label>
                <input
                  type="text"
                  id="LandlineNumber"
                  name="LandlineNumber"
                  value={formData.LandlineNumber}
                  onChange={handleChange}
                  maxLength={12}
                  placeholder="10-12 digits"
                />
                {errors.LandlineNumber && (
                  <span className="error">{errors.LandlineNumber}</span>
                )}
              </div>

              <div className="data">
                <label htmlFor="Email">Email ID*</label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  maxLength={20}
                  required
                />
                {errors.Email && (
                  <span className="error">{errors.Email}</span>
                )}
              </div>
            </div>
          </div>
        
          {/* Submit Button */}
          <div className="submit-button">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
        <button className="cancel-button-header" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </>
  );
}