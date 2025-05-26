import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateSalesTeamForm() {
    
    const [formData, setFormData] = useState({
        teamCode: "",
        teamName: "",
      
    });

    const [errors, setErrors] = useState({});


      const handleCancel = () => {
        window.location.href = '/displaySalesTeamPage'; 
      };
      

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
        const { name, value } = e.target;
        
        // Validate the field
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
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
        
        Object.keys(formData).forEach(key => {
            if (key !== 'status') { // Skip validation for status dropdown
                const error = validateField(key, formData[key]);
                if (error) {
                    newErrors[key] = error;
                    formValid = false;
                }
            }
        });
        
        setErrors(newErrors);
        
        if (formValid) {
            // In a real app, you would send this data to your backend
            console.log("Form data valid, ready to submit:", formData);
            alert("Sales Team created successfully (simulated)!");
            // Reset form after successful submission
            setFormData({
                teamCode: "",
                teamName: "",
                
            });
        } else {
            alert("Please fix the errors in the form before submitting.");
        }
    };

    return (
<>

      

        <div className="container">
           

                <form onSubmit={handleSubmit}>
                    {/* Sales Team Details */}
                    <div className="header-box">
                        <h2>Sales Team Information</h2>
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
                                    value={formData.teamCode}
                                    onChange={handleChange}
                                    maxLength={4}
                                    required
                                />
                                {errors.teamCode && <span className="error">{errors.teamCode}</span>}
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
                                />
                                {errors.teamName && <span className="error">{errors.teamName}</span>}
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
      
            {/* <FormPageHeader /> */}
        </>
    );
}