import { useState, useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";
import { FaEdit, FaSave } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditDeliveryLocationForm() {
    const { setGoBackUrl } = useContext(FormPageHeaderContext);
    const { deliveryLocationCode } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        deliveryLocationCode: "",
        deliveryLocationName: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        region: "",
        country: "",
        pinCode: "",
    });

    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const indianCities = [
        "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", 
        "Chennai", "Kolkata", "Surat", "Pune", "Jaipur"
    ];
    
    const otherCities = [
        "New York", "London", "Tokyo", "Paris", "Dubai",
        "Singapore", "Sydney", "Toronto", "Berlin", "Beijing"
    ];

    useEffect(() => {
        setGoBackUrl("/displayDeliveryLocationForm");
        fetchDeliveryLocation();
    }, [setGoBackUrl, deliveryLocationCode]);

    const fetchDeliveryLocation = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3003/api/delivery-locations/${deliveryLocationCode}`
            );
            setFormData(response.data);
            setOriginalData(response.data);
        } catch (error) {
            console.error("Error fetching delivery location:", error);
            alert("Failed to fetch delivery location data");
            navigate("/displayDeliveryLocationForm");
        } finally {
            setIsLoading(false);
        }
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'deliveryLocationCode':
                if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
                    return 'Delivery Location Code must be exactly 4 alphanumeric characters';
                }
                break;
            case 'deliveryLocationName':
                if (value.length > 30 || !/^[a-zA-Z0-9 ]+$/.test(value)) {
                    return 'Delivery Location Name must be alphanumeric and up to 30 characters';
                }
                break;
            case 'street1':
                if (value.length > 50) {
                    return 'Street 1 must be less than 50 characters';
                }
                break;
            case 'street2':
                if (value.length > 50 || (value && !/^[a-zA-Z0-9 ]+$/.test(value))) {
                    return 'Street 2 must be alphanumeric and less than 50 characters';
                }
                break;
            case 'city':
                if (value.length > 30 || !/^[a-zA-Z ]+$/.test(value)) {
                    return 'City must be alphabetical and less than 30 characters';
                }
                break;
            case 'state':
                if (value.length > 30 || !/^[a-zA-Z ]+$/.test(value)) {
                    return 'State must be alphabetical and less than 30 characters';
                }
                break;
            case 'region':
                if (value.length > 50 || !/^[a-zA-Z0-9 ]+$/.test(value)) {
                    return 'Region must be alphanumeric and less than 50 characters';
                }
                break;
            case 'country':
                if (value.length > 30 || !/^[a-zA-Z ]+$/.test(value)) {
                    return 'Country must be alphabetical and less than 30 characters';
                }
                break;
            case 'pinCode':
                if (!/^[0-9]{4,6}$/.test(value)) {
                    return 'Pin code must be numeric and between 4 to 6 digits';
                }
                break;
            default:
                return '';
        }
        return '';
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEditing) return;
        
        setIsSubmitting(true);
        
        // Validate all fields
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
            const payload = {
                deliveryLocationName: formData.deliveryLocationName,
                street1: formData.street1,
                street2: formData.street2,
                city: formData.city,
                state: formData.state,
                region: formData.region,
                country: formData.country,
                pinCode: formData.pinCode
            };

            const response = await axios.put(
                `http://localhost:3003/api/delivery-locations/${deliveryLocationCode}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                alert("Delivery Location updated successfully!");
                setOriginalData(formData);
                setIsEditing(false);
                await fetchDeliveryLocation(); // Refresh data
            }
        } catch (error) {
            console.error("Error updating delivery location:", error);
            if (error.response) {
                if (error.response.status === 400) {
                    alert("Invalid data format. Please check your inputs.");
                } else if (error.response.status === 409) {
                    alert("Delivery Location Code already exists");
                } else {
                    alert(`Error: ${error.response.data.message || "Failed to update delivery location"}`);
                }
            } else {
                alert("Network error. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleEdit = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setFormData(originalData);
        setErrors({});
        setIsEditing(false);
    };

    if (isLoading) {
        return <div className="container">Loading...</div>;
    }

    return (
        <>
            <div className="container">
                <form id="deliveryLocationForm" onSubmit={handleSubmit}>
                    <div className="edit-controls">
                        {isEditing ? (
                            <button 
                                type="submit" 
                                className="save-button-edit-page"
                                disabled={isSubmitting}
                            >
                                <FaSave /> {isSubmitting ? "Saving..." : "Save"}
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
                    
                    <div className="header-box">
                        <h2>Delivery Location Details</h2>
                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="deliveryLocationCode">Delivery Location Code*</label>
                                <span className="info-icon-tooltip">
                                    <i className="fas fa-info-circle" />
                                    <span className="tooltip-text">
                                        1- Must be exactly 4 alphanumeric characters<br />
                                        2- Must be unique<br />
                                        3- No special characters<br />
                                        4- No spaces<br /> 
                                        5- Cannot be deleted once created<br />
                                    </span>
                                </span>
                                <input
                                    type="text"
                                    id="deliveryLocationCode"
                                    name="deliveryLocationCode"
                                    value={formData.deliveryLocationCode}
                                    onChange={handleChange}
                                    maxLength={4}
                                    required
                                    readOnly
                                    className="read-only"
                                />
                                {errors.deliveryLocationCode && (
                                    <span className="error">{errors.deliveryLocationCode}</span>
                                )}
                            </div>
                            <div className="data">
                                <label htmlFor="deliveryLocationName">Delivery Location Name*</label>
                                <input
                                    type="text"
                                    id="deliveryLocationName"
                                    name="deliveryLocationName"
                                    value={formData.deliveryLocationName}
                                    onChange={handleChange}
                                    maxLength={30}
                                    required
                                    readOnly={!isEditing}
                                    className={!isEditing ? "read-only" : ""}
                                />
                                {errors.deliveryLocationName && (
                                    <span className="error">{errors.deliveryLocationName}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="item-box">
                        <h2>Address Details</h2>
                        <div className="data-container">
                            <div className="data">
                                <label htmlFor="street1">Street 1</label>
                                <textarea
                                    id="street1"
                                    name="street1"
                                    value={formData.street1}
                                    onChange={handleChange}
                                    maxLength={50}
                                    readOnly={!isEditing}
                                    className={!isEditing ? "read-only" : ""}
                                />
                                {errors.street1 && (
                                    <span className="error">{errors.street1}</span>
                                )}
                            </div>
                            <div className="data">
                                <label htmlFor="street2">Street 2</label>
                                <textarea
                                    id="street2"
                                    name="street2"
                                    value={formData.street2}
                                    onChange={handleChange}
                                    maxLength={50}
                                    readOnly={!isEditing}
                                    className={!isEditing ? "read-only" : ""}
                                />
                                {errors.street2 && (
                                    <span className="error">{errors.street2}</span>
                                )}
                            </div>
                            <div className="data">
                                <label htmlFor="state">State*</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    maxLength={30}
                                    required
                                    readOnly={!isEditing}
                                    className={!isEditing ? "read-only" : ""}
                                />
                                {errors.state && <span className="error">{errors.state}</span>}
                            </div>

                            <div className="data">
                                <label htmlFor="region">Region*</label>
                                <select
                                    id="region"
                                    name="region"
                                    value={formData.region}
                                    onChange={handleChange}
                                    required
                                    disabled={!isEditing}
                                    className={!isEditing ? "read-only" : ""}
                                >
                                    <option value="">Select a region</option>
                                    {[
                                        "Northern Africa", "Western Africa", "Eastern Africa",
                                        "Central Africa", "Southern Africa", "Northern America",
                                        "Central America", "Caribbean", "South America",
                                        "Central Asia", "Eastern Asia", "South-Eastern Asia",
                                        "Southern Asia", "Western Asia", "Eastern Europe",
                                        "Northern Europe", "Southern Europe", "Western Europe",
                                        "Australia and New Zealand", "Melanesia", "Micronesia", "Polynesia"
                                    ].map(region => (
                                        <option key={region} value={region}>{region}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="data">
                                <label htmlFor="country">Country*</label>
                                <select
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                    disabled={!isEditing}
                                    className={!isEditing ? "read-only" : ""}
                                >
                                    <option value="">Select a country</option>
                                    {[
                                        "India", "United States", "United Kingdom",
                                        "Canada", "Australia", "Germany",
                                        "France", "Japan", "China", "Brazil"
                                    ].map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                                {errors.country && (
                                    <span className="error">{errors.country}</span>
                                )}
                            </div>
                            <div className="data">
                                <label htmlFor="city">City*</label>
                                <select
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    disabled={!isEditing || !formData.country}
                                    className={!isEditing ? "read-only" : ""}
                                >
                                    <option value="">Select a city</option>
                                    {formData.country === "India" 
                                        ? indianCities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))
                                        : otherCities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))
                                    }
                                </select>
                                {errors.city && <span className="error">{errors.city}</span>}
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
                                    readOnly={!isEditing}
                                    className={!isEditing ? "read-only" : ""}
                                />
                                {errors.pinCode && (
                                    <span className="error">{errors.pinCode}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <FormPageHeader onCancel={handleCancelEdit} />
        </>
    );
}