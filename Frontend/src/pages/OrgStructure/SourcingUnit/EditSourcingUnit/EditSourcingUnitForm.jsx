import { useState, useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { FaEdit, FaSave } from "react-icons/fa";

export default function EditSourcingUnitForm() {
        const { setGoBackUrl } = useContext(FormPageHeaderContext);
    
  const [formData, setFormData] = useState({
    unitId: "",
    unitDescription: ""
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    setGoBackUrl("/displaySourcingUnit");
    const mockData = {
      unitId: "ABC1",
      unitDescription: "Sample Business",
    };
    setFormData(mockData);
    setOriginalData(mockData);
  }, [setGoBackUrl]);


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
      alert("Sourcing Unit updated successfully!");
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
              form="sourcingUnitForm" 
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
        
        <form id="sourcingUnitForm" onSubmit={handleSubmit}>
          {/* Sourcing Unit Details */}
          <div className="header-box">
            <h2>Sourcing Unit Details</h2>
            <div className="data-container">
              <div className="data">
                <label htmlFor="unitId">Sourcing Unit Code*</label>
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
                  readOnly={!isEditing}
                  className={!isEditing ? "read-only" : ""}
                />
                {errors.unitId && (
                  <span className="error">{errors.unitId}</span>
                )}
              </div>
              <div className="data">
                <label htmlFor="unitDescription">Sourcing Unit Description*</label>
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
                  readOnly={!isEditing}
                  className={!isEditing ? "read-only" : ""}
                />
                {errors.unitDescription && (
                  <span className="error">{errors.unitDescription}</span>
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