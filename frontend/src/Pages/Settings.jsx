import React, { useState } from 'react'
import Menu from '../Components/Menu'
import "../styles/Setting.css"

const Settings = () => {

  const [formData, setFormData] = useState({
    firstName: "Sarthak",
    lastName: "Pal",
    email: "Sarthakpal08@gmail.com",
    password: "********",
    confirmPassword: "********",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement save logic
    console.log("Updated Profile:", formData);
  };
  return (
    <div className='setting-outside-container'>
      <div className='setting-menu-container'>
        <Menu />
      </div>
      <div className='setting-screen-container'>
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
  )
}

export default Settings