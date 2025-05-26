import { useState} from "react";

import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateSourcingUnitForm() {
    
  const [formData, setFormData] = useState({
    unitId: "",
    unitDescription: ""
  });

  const [errors, setErrors] = useState({});


  const handleCancel = () => {
    window.location.href = '/displaySourcingUnit'; 
  };

  const validateField = (name, value) => {
    switch (name) {
      case "unitId":
        if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
          return "Sourcing Unit ID must be exactly 4 alphanumeric characters";
        }
        break;
      case "unitDescription":
        if (value.length > 30 || !/^[a-zA-Z0-9 ]+$/.test(value)) {
          return "Description must be alphanumeric and up to 30 characters";
        }
        break;
      default:
        return "";
    }
    return "";
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
      alert("Sourcing Unit created successfully (simulated)!");
      // Reset form after successful submission
      setFormData({
        unitId: "",
        unitDescription: ""
      });
    } else {
      alert("Please fix the errors in the form before submitting.");
    }
  };

  return (
<>
   
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* Sourcing Unit Details */}
        <div className="header-box">
          <h2>Sourcing Unit Details</h2>
          <div className="data-container">
            <div className="data">
              <label htmlFor="unitId">Sourcing Unit ID*</label>
              <span className="info-icon-tooltip">
                  <i className="fas fa-info-circle" />
                  <span className="tooltip-text">
                    1- Sourcing Unit Code must be exactly 4 digits. <br />
                    2- Sourcing Unit Code must be unique. <br />
                    3- Sourcing Unit Code must not contain any special characters.  <br />
                    4- Sourcing Unit Code must not contain any spaces. <br /> 
                    5- Sourcing Unit Code once created then it can be not delete. <br />
                  </span>
                </span>
              <input
                type="text"
                id="unitId"
                name="unitId"
                value={formData.unitId}
                onChange={handleChange}
                maxLength={4}
                required
              />
              {errors.unitId && (
                <span className="error">{errors.unitId}</span>
              )}
            </div>
            <div className="data">
              <label htmlFor="unitDescription">Description*</label>
              <span className="info-icon-tooltip">
                  <i className="fas fa-info-circle" />
                  <span className="tooltip-text">
                  Sourcing Unit Description must be alphanumeric and up to 30 characters.
                  </span>
                </span>
              <input
                type="text"
                id="unitDescription"
                name="unitDescription"
                value={formData.unitDescription}
                onChange={handleChange}
                maxLength={30}
                required
              />
              {errors.unitDescription && (
                <span className="error">{errors.unitDescription}</span>
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