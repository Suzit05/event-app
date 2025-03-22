import React, { useState } from "react";
import "../styles/Events2.css";

const Events2 = () => {
  const [bgColor, setBgColor] = useState("#000000");
  const [link, setLink] = useState("");
  const [emails, setEmails] = useState("");

  const handleColorChange = (color) => {
    setBgColor(color);
  };

  return (
    <div className="events-container">
      <h2 className="events-title">Create Event</h2>
      <p className="events-subtitle">
        Create events to share for people to book on your calendar.
      </p>

      <div className="events-card">
        <h3 className="events-header">Add Event</h3>

        {/* Banner Section */}
        <div className="banner-section">
          <label>Banner</label>
          <div className="banner-preview" style={{ backgroundColor: bgColor }}>
            <img src="/avatar.png" alt="Avatar" className="avatar" />
            <p className="event-name">Team A Meeting-1</p>
          </div>
        </div>

        {/* Background Color Selection */}
        <div className="color-selection">
          <label>Custom Background Color</label>
          <div className="color-options">
            <button className="color-btn" style={{ backgroundColor: "#FF6600" }} onClick={() => handleColorChange("#FF6600")}></button>
            <button className="color-btn" style={{ backgroundColor: "#FFFFFF", border: "1px solid #ddd" }} onClick={() => handleColorChange("#FFFFFF")}></button>
            <button className="color-btn" style={{ backgroundColor: "#000000" }} onClick={() => handleColorChange("#000000")}></button>
          </div>
          <input
            type="text"
            className="color-input"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>

        {/* Link and Email Input */}
        <div className="form-group">
          <label>Add link <span className="required">*</span></label>
          <input
            type="text"
            placeholder="Enter URL Here"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Add Emails <span className="required">*</span></label>
          <input
            type="text"
            placeholder="Add member Emails"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Events2;
