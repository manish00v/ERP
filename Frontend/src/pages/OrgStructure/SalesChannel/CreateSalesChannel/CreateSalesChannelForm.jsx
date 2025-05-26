import { useState, useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
// import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateSalesChannelForm() {
    const { setGoBackUrl } = useContext(FormPageHeaderContext);

    const [formData, setFormData] = useState({
        salesChannelId: "",
        Description: "",
        
    });

    const [error, errors, setError] = useState("");

    useEffect(() => {
        setGoBackUrl("/displaySalesChannel");
      }, [setGoBackUrl]);

      const handleCancel = () => {
        window.location.href = '/displaySalesChannel'; 
      };
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate Sales Channel ID
        if (!/^[a-zA-Z0-9]{4}$/.test(formData.salesChannelId)) {
            setError("Sales Channel ID must be exactly 4 alphanumeric characters");
            return;
        }
        
        // Validate Sales Channel Name
        if (formData.Description.length > 100) {
            setError("Sales Channel Description cannot exceed 100 characters");
            return;
        }
        
        setError("");
        console.log("Form submitted:", formData);
        alert("Form submitted successfully (demo)");
    };

    return (

        <>
     
     

        <div className="container">
          
                
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Sales Channel Box */}
                    <div className="header-box">
                        <h2>Sales Channel</h2>

                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="salesChannelId">Sales Channel ID*</label>
                                <span className="info-icon-tooltip">
                  <i className="fas fa-info-circle" />
                  <span className="tooltip-text">
                    1- Sales Channel Code must be exactly 4 digits. <br />
                    2- Sales Channel Code must be unique. <br />
                    3- Sales Channel Code must not contain any special characters.  <br />
                    4- Sales Channel Code must not contain any spaces. <br /> 
                    5- Sales Channel Code once created then it can be not delete. <br />
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
                                />
                            </div>

                            <div className="data">
                                    <label htmlFor="description">Description</label>
                                    <span className="info-icon-tooltip">
                  <i className="fas fa-info-circle" />
                  <span className="tooltip-text">
                  Sales Channel Description must be alphanumeric and up to 30 characters.
                  </span>
                  </span>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        maxLength={100}
                                        rows={3}
                                    />
                                    {errors.description && <span className="error">{errors.description}</span>}
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