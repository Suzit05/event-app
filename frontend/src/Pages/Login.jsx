import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import rightLogin from "../assets/images/rightLogin.png";
import cnnctlogo from "../assets/images/cnnctlogo.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5001/api/auth/login",
                { email, password },
                { withCredentials: true }
            );

            console.log("✅ Login Response:", response.data);

            if (response.data.token) {
                localStorage.setItem("authToken", response.data.token);
                navigate("/about");
            } else {
                console.log("❌ No Token Received");
                setError("Invalid credentials.");
            }
        } catch (error) {
            console.error("🔥 Login Error:", error.response?.data || error);
            setError(error.response?.data?.message || "Invalid email or password.");
        }
    };



    return (
        <div className="outer-container">
            <div className="left-container">
                <div className="logo-container">
                    <img src={cnnctlogo} alt="" />
                </div>
                <div className="form-container">
                    <h1>Sign in</h1>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="input-div">
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <p>Don't have an account? <span className="signup-link">Sign up</span></p>
                </div>
            </div>
            <div className="right-container">
                <img src={rightLogin} alt="" />
            </div>
        </div>
    );
};

export default Login;
