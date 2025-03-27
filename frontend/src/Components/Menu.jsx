import React, { useEffect, useRef, useState } from "react";
import "../styles/Menu.css";
import cnnctLogo from "../assets/images/cnnctlogo.png";
import userdp from "../assets/images/userdp.png"
import { useNavigate } from "react-router-dom";

const Menu = () => {

    //mobile k liye menu component bnao
    //mobile k liye meetings and booking bnao

    const [hostName, setHostName] = useState(""); // Empty initially
    const [showLogout, setShowLogout] = useState(false);
    const profileRef = useRef(null);




    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/auth/user", {
                    method: "GET",
                    credentials: "include", // ✅ Send cookies with request
                });
                const data = await response.json();
                if (response.ok) {
                    setHostName(`${data.firstName} ${data.lastName}`);
                } else {
                    console.error("Error fetching user:", data.message);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    // Handle logout
    const handleLogout = async () => {
        try {
            await fetch("http://localhost:5001/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            navigate("/login"); // Redirect to login after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Toggle logout button visibility
    const toggleLogout = () => {
        setShowLogout((prev) => !prev);
    };

    // Hide logout button when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowLogout(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navigate = useNavigate()
    return (
        <div className="menu-container">

            <div className="menu-logo">
                <img src={cnnctLogo} alt="CNNCT Logo" />
            </div>

            <nav className="menu-nav">

                <ul>
                    <div onClick={() => navigate("/meetings")} className="active">
                        <i className="ri-loop-left-line"></i> Events
                    </div>
                    <div onClick={() => navigate("/booking")}>
                        <i className="ri-calendar-line"></i> Booking
                    </div>
                    <div onClick={() => navigate("/availability")}>
                        <i className="ri-time-line"></i> Availability
                    </div>
                    <div onClick={() => navigate("/settings")} >
                        <i className="ri-settings-3-line"></i> Settings
                    </div>
                </ul>



            </nav>

            <button onClick={() => navigate("/create-event")} className="menu-create-btn">
                <i className="ri-add-line"></i> Create
            </button>

            <div className="menu-profile" onClick={toggleLogout} ref={profileRef}>
                <img src={userdp} alt="User" className="profile-img" />
                <span className="profile-name">{hostName}</span>

                {showLogout && (
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </div>

    );
};

export default Menu;
