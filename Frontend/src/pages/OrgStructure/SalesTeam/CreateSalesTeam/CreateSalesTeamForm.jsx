import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateSalesTeamForm() {
    const [formData, setFormData] = useState({
        salesTeamCode: "",
        salesTeamName: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCancel = () => {
        window.location.href = '/displaySalesTeamPage'; 
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'salesTeamCode':
                if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
                    return 'Sales Team Code must be exactly 4 alphanumeric characters';
                }
                break;
            case 'salesTeamName':
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

        setFormData(prevData => ({
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
        
        Object.keys(formData).forEach(key => {
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
            const response = await fetch('http://localhost:3003/api/sales-teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    salesTeamCode: formData.salesTeamCode,
                    salesTeamName: formData.salesTeamName
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create sales team');
            }

            const result = await response.json();
            alert("Sales Team created successfully!");
            // Reset form after successful submission
            setFormData({
                salesTeamCode: "",
                salesTeamName: "",
            });
            // Optionally redirect to display page
            // window.location.href = '/displaySalesTeamPage';
        } catch (error) {
            console.error('Error creating sales team:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
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
                                <label htmlFor="salesTeamCode">Sales Team Code*</label>
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
                                    id="salesTeamCode"
                                    name="salesTeamCode"
                                    value={formData.salesTeamCode}
                                    onChange={handleChange}
                                    maxLength={4}
                                    required
                                />
                                {errors.salesTeamCode && <span className="error">{errors.salesTeamCode}</span>}
                            </div>
                            <div className="data">
                                <label htmlFor="salesTeamName">Sales Team Name*</label>
                                <span className="info-icon-tooltip">
                                    <i className="fas fa-info-circle" />
                                    <span className="tooltip-text">
                                        Sales Team Name must be alphanumeric and up to 30 characters.
                                    </span>
                                </span>
                                <input
                                    type="text"
                                    id="salesTeamName"
                                    name="salesTeamName"
                                    value={formData.salesTeamName}
                                    onChange={handleChange}
                                    maxLength={30}
                                    required
                                />
                                {errors.salesTeamName && <span className="error">{errors.salesTeamName}</span>}
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