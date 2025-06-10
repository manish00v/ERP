import { useState } from "react";
import axios from "axios";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateSourcingUnitForm() {
  const [formData, setFormData] = useState({
    SourcingUnitId: "",
    SourcingUnitDesc: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    window.location.href = '/displaySourcingUnit'; 
  };

  const validateField = (name, value) => {
    switch (name) {
      case "SourcingUnitId":
        if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
          return "Sourcing Unit ID must be exactly 4 alphanumeric characters";
        }
        break;
      case "SourcingUnitDesc":
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
      const response = await axios.post(
        "http://localhost:5003/api/sourcing-units/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Sourcing Unit created successfully!");
        setFormData({
          SourcingUnitId: "",
          SourcingUnitDesc: ""
        });
        // Optionally redirect to display page
        // window.location.href = '/displaySourcingUnit';
      }
    } catch (error) {
      console.error("Error creating sourcing unit:", error);
      if (error.response) {
        if (error.response.status === 409) {
          alert("Error: Sourcing Unit ID already exists.");
        } else {
          alert(`Error: ${error.response.data.message || "Failed to create sourcing unit"}`);
        }
      } else {
        alert("Network error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
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
                <label htmlFor="SourcingUnitId">Sourcing Unit ID*</label>
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
                  id="SourcingUnitId"
                  name="SourcingUnitId"
                  value={formData.SourcingUnitId}
                  onChange={handleChange}
                  maxLength={4}
                  required
                />
                {errors.SourcingUnitId && (
                  <span className="error">{errors.SourcingUnitId}</span>
                )}
              </div>
              <div className="data">
                <label htmlFor="SourcingUnitDesc">Description*</label>
                <span className="info-icon-tooltip">
                  <i className="fas fa-info-circle" />
                  <span className="tooltip-text">
                    Sourcing Unit Description must be alphanumeric and up to 30 characters.
                  </span>
                </span>
                <input
                  type="text"
                  id="SourcingUnitDesc"
                  name="SourcingUnitDesc"
                  value={formData.SourcingUnitDesc}
                  onChange={handleChange}
                  maxLength={30}
                  required
                />
                {errors.SourcingUnitDesc && (
                  <span className="error">{errors.SourcingUnitDesc}</span>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-button">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
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