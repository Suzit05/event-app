import React from "react";
import "../styles/Menu.css";
import cnnctLogo from "../assets/images/cnnctlogo.png";

const Menu = () => {
    return (
        <div className="menu-container">
            <div className="menu-logo">
                <img src={cnnctLogo} alt="CNNCT Logo" />
            </div>

            <nav className="menu-nav">
                <ul>
                    <li className="active">
                        <i className="ri-loop-left-line"></i> Events
                    </li>
                    <li>
                        <i className="ri-calendar-line"></i> Booking
                    </li>
                    <li>
                        <i className="ri-time-line"></i> Availability
                    </li>
                    <li>
                        <i className="ri-settings-3-line"></i> Settings
                    </li>
                </ul>
            </nav>

            <button className="menu-create-btn">
                <i className="ri-add-line"></i> Create
            </button>

            <div className="menu-profile">
                <img
                    src="https://via.placeholder.com/40" // Replace with user's profile image
                    alt="User"
                    className="profile-img"
                />
                <span className="profile-name">sarthak pal</span>
            </div>
        </div>
    );
};

export default Menu;
