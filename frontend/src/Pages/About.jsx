import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cnnctlogo from "../assets/images/cnnctlogo.png";
import rightLogin from "../assets/images/rightLogin.png";
import "../styles/About.css";
import { toast, ToastContainer } from 'react-toastify';  // Import toast

const categories = [
    { name: "Sales", icon: "ri-store-2-line" },
    { name: "Finance", icon: "ri-money-dollar-circle-line" },
    { name: "Consulting", icon: "ri-briefcase-4-line" },
    { name: "Tech", icon: "ri-computer-line" },
    { name: "Education", icon: "ri-book-2-line" },
    { name: "Government & Politics", icon: "ri-government-line" },
    { name: "Recruiting", icon: "ri-user-search-line" },
    { name: "Marketing", icon: "ri-rocket-line" },
];

const About = () => {
    const [selected, setSelected] = useState("Sales");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleContinue = async () => {
        if (!username) {
            setError("Username cannot be empty.");
            return;
        }

        try {
            const response = await axios.put(
                "http://localhost:5001/api/auth/about",
                { username },
                {
                    withCredentials: true, // Include cookies in the request
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Username Updated:", response.data);
            setSuccess("Username updated successfully!");
            toast.success("Username updated successfully!", { position: "top-center", autoClose: 3000 });
            setError("");

            setTimeout(() => {
                navigate("/meetings");
            }, 1500);
        } catch (error) {
            toast.error("Error updating username.", { position: "top-center", autoClose: 3000 });
            console.error("Error updating username:", error.response?.data || error);
            setError(error.response?.data?.message || "Something went wrong.");
            setSuccess("");
        }
    };



    return (
        <div className="about-outer-container">
            <ToastContainer />
            <div className="about-left-container">
                <div className="about-logo-container">
                    <img src={cnnctlogo} alt="" />
                </div>
                <div className="about-form-container">
                    <div className="about-heading">
                        <h1>Your Preferences</h1>
                        <input
                            type="text"
                            placeholder="Tell us your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <h3>Select one category that describes your CNNCT:</h3>
                    <div className="category-container">
                        {categories.map((category) => (
                            <div
                                key={category.name}
                                className={`category-item ${selected === category.name ? "active" : ""}`}
                                onClick={() => setSelected(category.name)}
                            >
                                <i className={`${category.icon} category-icon`}></i>
                                <span>{category.name}</span>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleContinue}>Continue</button>
                </div>
            </div>
            <div className="right-container">
                <img src={rightLogin} alt="" />
            </div>
        </div>
    );
};

export default About;
