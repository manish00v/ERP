import { useState, useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import { useNavigate } from "react-router-dom";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import axios from "axios";

export default function CreateSalesChannelForm() {
    const { setGoBackUrl } = useContext(FormPageHeaderContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        salesChannelId: "",
        salesChannelName: ""
    });

    const [errors, setErrors] = useState({
        salesChannelId: "",
        salesChannelName: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setGoBackUrl("/displaySalesChannel");
    }, [setGoBackUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            salesChannelId: "",
            salesChannelName: ""
        };

        // Validate Sales Channel ID
        if (!/^[a-zA-Z0-9]{4}$/.test(formData.salesChannelId)) {
            newErrors.salesChannelId = "Must be exactly 4 alphanumeric characters";
            isValid = false;
        }

        // Validate Sales Channel Name
        if (!formData.salesChannelName.trim()) {
            newErrors.salesChannelName = "Description is required";
            isValid = false;
        } else if (formData.salesChannelName.length > 30) {
            newErrors.salesChannelName = "Cannot exceed 30 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(
                "http://localhost:3003/api/sales-channels",
                formData
            );

            if (response.status === 201) {
                alert("Sales Channel created successfully!");
                navigate("/displaySalesChannel");
            }
        } catch (error) {
            console.error("Error creating sales channel:", error);
            
            if (error.response) {
                if (error.response.status === 409) {
                    setErrors(prev => ({
                        ...prev,
                        salesChannelId: "This Sales Channel ID already exists"
                    }));
                } else {
                    alert(`Error: ${error.response.data.message || "Failed to create sales channel"}`);
                }
            } else {
                alert("Network error. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/displaySalesChannel");
    };


    return (

        <>
     
     
 <div className="container">
            {errors.general && <div className="error-message">{errors.general}</div>}

            <form onSubmit={handleSubmit}>
                <div className="header-box">
                    <h2>Sales Channel</h2>

                    <div className="data-container">
                        <div className="data">
                            <label htmlFor="salesChannelId">Sales Channel ID*</label>
                            <span className="info-icon-tooltip">
                                <i className="fas fa-info-circle" />
                                <span className="tooltip-text">
                                    1- Must be exactly 4 alphanumeric characters<br />
                                    2- Must be unique<br />
                                    3- No special characters or spaces<br />
                                    4- Cannot be changed after creation<br />
                                </span>
                            </span>
                            <input
                                type="text"
                                id="salesChannelId"
                                name="salesChannelId"
                                placeholder="4 alphanumeric characters"
                                value={formData.salesChannelId}
                                onChange={handleChange}
                                maxLength={4}
                                required
                                className={errors.salesChannelId ? "error-input" : ""}
                            />
                            {errors.salesChannelId && (
                                <span className="error">{errors.salesChannelId}</span>
                            )}
                        </div>

                        <div className="data">
                            <label htmlFor="salesChannelName">Description*</label>
                            <span className="info-icon-tooltip">
                                <i className="fas fa-info-circle" />
                                <span className="tooltip-text">
                                    Description must be up to 30 characters
                                </span>
                            </span>
                            <input
                                type="text"
                                id="salesChannelName"
                                name="salesChannelName"
                                placeholder="Enter description"
                                value={formData.salesChannelName}
                                onChange={handleChange}
                                maxLength={30}
                                required
                                className={errors.salesChannelName ? "error-input" : ""}
                            />
                            {errors.salesChannelName && (
                                <span className="error">{errors.salesChannelName}</span>
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
            {/* <FormPageHeader /> */}
        </>
    );
}