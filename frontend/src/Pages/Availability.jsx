import React, { useState } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/Availability.css"
import Menu from '../Components/Menu'
import { FaRegCopy } from "react-icons/fa";

const localizer = momentLocalizer(moment);

const Availability = () => {

  const [view, setView] = useState("availability"); // Default view
  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: new Date(2024, 2, 28, 9, 0), // Example event
      end: new Date(2024, 2, 28, 10, 0),
    },
  ]);
  // Handle adding a new event when user selects a slot
  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("Enter Event Title:");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  // Handle editing an event when user clicks it
  const handleSelectEvent = (event) => {
    const newTitle = window.prompt("Edit Event Title:", event.title);
    if (newTitle) {
      setEvents(events.map(e => (e === event ? { ...e, title: newTitle } : e)));
    }
  };

  const [availability, setAvailability] = useState({
    Sun: { checked: true, slots: [["", ""]] },
    Mon: { checked: true, slots: [["", ""]] },
    Tue: { checked: true, slots: [["", ""]] },
    Wed: { checked: true, slots: [["", ""]] },
    Thus: { checked: true, slots: [["", ""]] },
    Fri: { checked: true, slots: [["", ""]] },
    Sat: { checked: true, slots: [["", ""]] },
  });

  const handleCheckboxChange = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], checked: !prev[day].checked },
    }));
  };

  const handleTimeChange = (day, index, type, value) => {
    const updatedSlots = [...availability[day].slots];
    updatedSlots[index][type === "start" ? 0 : 1] = value;

    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], slots: updatedSlots },
    }));
  };

  const addSlot = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], slots: [...prev[day].slots, ["", ""]] },
    }));
  };

  const removeSlot = (day, index) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className='avail-outside-container'>
      <div className='avail-menu-container'>
        <Menu />
      </div>
      <div className='avail-screen-container'>
        <div className="availability-container">
          <h2 className="title">Availability</h2>
          <p className="subtitle">Configure times when you are available for bookings</p>

          {/* ✅ Fixed: View Toggle */}
          <div className="view-buttons">
            <button
              className={`btn ${view === "availability" ? "active" : ""}`}
              onClick={() => setView("availability")}
            >
              📋 Availability
            </button>
            <button
              className={`btn ${view === "calendar" ? "active" : ""}`}
              onClick={() => setView("calendar")}
            >
              📅 Calendar View
            </button>
          </div>
          {view === "availability" ? (

            <div className="availability-card">
              <div className="availability-header">
                <span className="activity">Activity <span className="dropdown">▼ Event type</span></span>
                <span className="timezone">Time Zone <span className="dropdown">▼ Indian Time Standard</span></span>
              </div>

              <div className="availability-list">
                {Object.entries(availability).map(([day, { checked, slots }]) => (
                  <div className="day-row" key={day}>
                    <input type="checkbox" checked={checked} onChange={() => handleCheckboxChange(day)} />
                    <span className="day-name">{day}</span>

                    {checked ? (
                      <div className="slots-container">
                        {slots.map((slot, index) => (
                          <div className="slot" key={index}>
                            <input
                              type="text"
                              placeholder="Start"
                              value={slot[0]}
                              onChange={(e) => handleTimeChange(day, index, "start", e.target.value)}
                            />
                            <span>-</span>
                            <input
                              type="text"
                              placeholder="End"
                              value={slot[1]}
                              onChange={(e) => handleTimeChange(day, index, "end", e.target.value)}
                            />
                            <button className="remove-btn" onClick={() => removeSlot(day, index)}>✖</button>
                            <button className="add-btn" onClick={() => addSlot(day)}>➕</button>
                            <button><FaRegCopy /></button>
                          </div>
                        ))}

                      </div>
                    ) : (
                      <span className="unavailable-text">Unavailable</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="calendar-view">
              <div className="calendar-header">
                <span className="activity">
                  Activity <span className="dropdown">▼ Event type</span>
                </span>
                <span className="timezone">
                  Time Zone <span className="dropdown">▼ Indian Time Standard</span>
                </span>
              </div>
              <div className="calendar-container">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  selectable
                  onSelectSlot={handleSelectSlot}
                  onSelectEvent={handleSelectEvent}
                  style={{ height: 500 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Availability