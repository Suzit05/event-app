import React, { useEffect, useState } from "react";
import Menu from "../Components/Menu";
import "../styles/Setting.css";
import { toast, ToastContainer } from 'react-toastify';  // Import toast
import 'react-toastify/dist/ReactToastify.css';  // Import CSS

const Settings = () => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://event-app-9djv.onrender.com";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {

      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "GET",
        credentials: "include", // Important for cookies
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not match", { position: "top-center", autoClose: 3000 });
      return;
    }

    try {

      const response = await fetch(`${API_BASE_URL}/api/user/update-profile`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update profile", { position: "top-center", autoClose: 3000 });

        return;
      }
      toast.success("Profile updated successfully!", { position: "top-center", autoClose: 3000 });

    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="setting-outside-container">
      <ToastContainer />
      <div className="setting-menu-container">
        <Menu />
      </div>
      <div className="setting-screen-container">
        <div className="settings-container">
          <h2 className="settings-title">Profile</h2>
          <p className="settings-subtitle">Manage settings for your profile</p>

          <div className="settings-card">
            <h3 className="settings-header">Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="save-btn">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
