import React, { useState } from 'react';
import axios from 'axios'; // For sending requests
import "../styles/Signup.css";
import rightLogin from "../assets/images/rightLogin.png";
import cnnctlogo from "../assets/images/cnnctlogo.png";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState({}); // Store validation errors
    const [loading, setLoading] = useState(false); // Loading state

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Validate form fields
    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

        // Email validation regex
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the terms";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return; // Stop if validation fails

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5001/api/auth/signup", formData); // Replace with your backend URL
            alert("Signup successful!");
            navigate("/login")


            console.log(response.data);

            setFormData({ // Reset form on success
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                agreeToTerms: false,
            });
            setErrors({});
        } catch (error) {
            alert("Signup failed. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='signup-outer-container'>
            <div className='signup-left-container'>
                <div className='signup-logo-container'>
                    <img src={cnnctlogo} alt="CNNCT Logo" />
                </div>
                <div className='signup-form-container'>
                    <div className='signup-heading'>
                        <h1>Create an Account</h1>
                        <h3>Sign-in instead</h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='signup-input-div'>
                            <input type="text" name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange} />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}

                            <input type="text" name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} />
                            {errors.lastName && <span className="error">{errors.lastName}</span>}

                            <input type="text" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                            {errors.email && <span className="error">{errors.email}</span>}

                            <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                            {errors.password && <span className="error">{errors.password}</span>}

                            <input type="password" name="confirmPassword" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} />
                            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

                            <div className="checkbox-div">
                                <input type="checkbox" id="terms-checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
                                <label htmlFor="terms-checkbox">
                                    By creating an account, I agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
                                </label>
                            </div>
                            {errors.agreeToTerms && <span className="error">{errors.agreeToTerms}</span>}
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? "Creating Account..." : "Create an account"}
                        </button>
                    </form>
                </div>
            </div>

            <div className='right-container'>
                <img src={rightLogin} alt="Signup Banner" />
            </div>
        </div>
    );
};

export default Signup;
