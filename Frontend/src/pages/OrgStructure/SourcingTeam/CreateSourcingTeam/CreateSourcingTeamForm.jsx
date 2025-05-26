import { useState } from "react";

import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateSourcingTeamForm() {

  const [formData, setFormData] = useState({
    teamId: "",
    teamDescription: "",
    teamType: "",
    countryCode: "",
    pinCode: "",
    phoneNumber: "",
    landlineNumber: "",
    email: ""
  });

  const [errors, setErrors] = useState({});
  const teamTypes = [
    "Individual",
    "Group"
  ];

  const validateField = (name, value) => {
    switch (name) {
      case "teamId":
        if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
          return "Sourcing Team ID must be exactly 4 alphanumeric characters";
        }
        break;
      case "teamDescription":
        if (value.length > 30 || !/^[a-zA-Z0-9 ]+$/.test(value)) {
          return "Sourcing Team Description must be alphanumeric and up to 30 characters";
        }
        break;
      case "teamType":
        if (!value) {
          return "Sourcing Team type is required";
        }
        break;
      case "countryCode":
        if (value.length > 5 || !/^[0-9+\-() ]+$/.test(value)) {
          return "Country code must be numeric with special characters (max 5 chars)";
        }
        break;
      case "pinCode":
        if (!/^\d{6}$/.test(value)) {
          return "Pin code must be exactly 6 digits";
        }
        break;
      case "phoneNumber":
        if (!/^\d{10,12}$/.test(value)) {
          return "Phone number must be 10-12 digits";
        }
        break;
      case "landlineNumber":
        if (!/^\d{10,12}$/.test(value)) {
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

    // Reset city when country changes
    if (name === "country") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        city: "", // Reset city when country changes
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    if (formValid) {
      // In a real app, you would send this data to your backend
      console.log("Form data valid, ready to submit:", formData);
      alert("Sourcing Team created successfully (simulated)!");
      // Reset form after successful submission
      setFormData({
        teamId: "",
        teamDescription: "",
        teamType: "",
        countryCode: "",
        pinCode: "",
        phoneNumber: "",
        landlineNumber: "",
        email: ""
      });
    } else {
      alert("Please fix the errors in the form before submitting.");
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
              <label htmlFor="teamId">Sourcing Team ID*</label>
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
              />
              {errors.teamDescription && (
                <span className="error">{errors.teamDescription}</span>
              )}
            </div>
            </div>
            </div>
            <div className="item-box">
          <h2>Other Details</h2>
          <div className="data-container">

            <div className="data">
              <label htmlFor="teamType">Sourcing Team Type*</label>
              <select
                id="teamType"
                name="teamType"
                value={formData.teamType}
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
              {errors.teamType && (
                <span className="error">{errors.teamType}</span>
              )}
            </div>

            <div className="data">
              <label htmlFor="pinCode">Pin Code*</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                maxLength={6}
                required
              />
              {errors.pinCode && (
                <span className="error">{errors.pinCode}</span>
              )}
            </div>

                  <div className="data">
              <label htmlFor="countryCode">Country Code*</label>
              <input
                type="text"
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                maxLength={5}
                required
                placeholder="e.g., +91"
              />
              {errors.countryCode && (
                <span className="error">{errors.countryCode}</span>
              )}
            </div>

          

            <div className="data">
              <label htmlFor="phoneNumber">Phone Number*</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength={12}
                required
                placeholder="10-12 digits"
              />
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber}</span>
              )}
            </div>

            <div className="data">
              <label htmlFor="landlineNumber">Landline Number</label>
              <input
                type="text"
                id="landlineNumber"
                name="landlineNumber"
                value={formData.landlineNumber}
                onChange={handleChange}
                maxLength={12}
                placeholder="10-12 digits"
              />
              {errors.landlineNumber && (
                <span className="error">{errors.landlineNumber}</span>
              )}
            </div>

            <div className="data">
              <label htmlFor="email">Email ID*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={20}
                required
              />
              {errors.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>
          </div>
        </div>
     
        

        {/* Submit Button */}
        <div className="submit-button">
            <button type="submit">Save</button>
          </div>
      </form>
      <button className="cancel-button-header" onClick={handleCancel}>
  Cancel
</button>
    </div>
  
    </>
  );
}