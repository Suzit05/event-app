import React, { useEffect, useRef, useState } from "react";
import "../styles/Menu.css";
import cnnctLogo from "../assets/images/cnnctlogo.png";
import userdp from "../assets/images/userdp.png"
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://event-app-9djv.onrender.com";
    //mobile k liye menu component bnao
    //mobile k liye meetings and booking bnao

    const [hostName, setHostName] = useState(""); // Empty initially
    const [showLogout, setShowLogout] = useState(false);
    const profileRefDesktop = useRef(null);
    const profileRefMobile = useRef(null);
    const navigate = useNavigate()



    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
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
        console.log("logout btn clicked")
        try {
            await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            navigate("/login"); // Redirect to login after logout
            window.location.reload();  // 🔄 Force UI to update
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
            if (
                (profileRefDesktop.current && !profileRefDesktop.current.contains(event.target)) &&
                (profileRefMobile.current && !profileRefMobile.current.contains(event.target))
            ) {
                setShowLogout(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div>
            <div>   <div className="menu-container">

                <div className="menu-logo">
                    <img src={cnnctLogo} alt="CNNCT Logo" />
                </div>

                <nav className="menu-nav">

                    <ul>
                        <div
                            onClick={() => navigate("/meetings")}
                            className={location.pathname === "/meetings" ? "active" : ""}
                        >
                            <i className="ri-loop-left-line"></i> Events
                        </div>
                        <div
                            onClick={() => navigate("/booking")}
                            className={location.pathname === "/booking" ? "active" : ""}
                        >
                            <i className="ri-calendar-line"></i> Booking
                        </div>
                        <div
                            onClick={() => navigate("/availability")}
                            className={location.pathname === "/availability" ? "active" : ""}
                        >
                            <i className="ri-time-line"></i> Availability
                        </div>
                        <div
                            onClick={() => navigate("/settings")}
                            className={location.pathname === "/settings" ? "active" : ""}
                        >
                            <i className="ri-settings-3-line"></i> Settings
                        </div>
                    </ul>



                </nav>

                <button onClick={() => navigate("/create-event")} className="menu-create-btn">
                    <i className="ri-add-line"></i> Create
                </button>

                <div className="menu-profile" onClick={toggleLogout} ref={profileRefDesktop}>
                    <img src={userdp} alt="User" className="profile-img" />
                    <span className="profile-name">{hostName}</span>

                    {showLogout && (
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
            </div>
            <div className="mobile-menu-container">
                <div className="mob-list">
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
                </div>
                <div className="menu-profile" onClick={toggleLogout} ref={profileRefMobile}>
                    <img src={userdp} alt="User" className="profile-img" />
                    <span className="profile-name">{hostName}</span>

                    {showLogout && (
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>


            </div>
        </div>

    );
};

export default Menu;
