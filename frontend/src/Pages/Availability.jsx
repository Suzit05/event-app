import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/Availability.css"
import Menu from '../Components/Menu'
import { FaRegCopy } from "react-icons/fa";

const localizer = momentLocalizer(moment);

const Availability = () => {

  const [view, setView] = useState("availability"); // Default view
  const [events, setEvents] = useState([]);
  const [availability, setAvailability] = useState({
    Sun: { checked: false, slots: [["", ""]] },
    Mon: { checked: false, slots: [["", ""]] },
    Tue: { checked: false, slots: [["", ""]] },
    Wed: { checked: false, slots: [["", ""]] },
    Thu: { checked: false, slots: [["", ""]] },
    Fri: { checked: false, slots: [["", ""]] },
    Sat: { checked: false, slots: [["", ""]] }
  });

  useEffect(() => {
    fetchAvailability(); // Load availability when component mounts
  }, []);

  // Fetch User Availability from Backend
  const fetchAvailability = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/user/get-avail", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        const formattedAvailability = {};
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
          const foundDay = data.find((d) => d.day === day);
          formattedAvailability[day] = foundDay
            ? { checked: true, slots: [[foundDay.startTime, foundDay.endTime]] }
            : { checked: false, slots: [["", ""]] };
        });

        setAvailability(formattedAvailability);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  // Update User Availability in Backend
  const updateAvailability = async () => {
    // Filter out empty or incomplete slots
    const formattedAvailability = Object.entries(availability)
      .filter(([_, { checked }]) => checked)
      .flatMap(([day, { slots }]) =>
        slots
          .filter(([start, end]) => start && end) // Only include complete slots
          .map(([startTime, endTime]) => ({
            day,
            startTime,
            endTime
          }))
      );

    if (formattedAvailability.length === 0) {
      alert("Please add at least one valid time slot");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/user/post-avail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ availability: formattedAvailability }),
      });

      if (!response.ok) {
        throw new Error("Failed to update availability");
      }

      const data = await response.json();
      alert(data.message || "Availability updated successfully!");
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Failed to update availability");
    }
  };
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
    <div className="avail-outside-container">
      <div className="avail-menu-container">
        <Menu />
      </div>
      <div className="avail-screen-container">
        <div className="availability-container">
          <h2 className="title">Availability</h2>
          <p className="subtitle">Configure times when you are available for bookings</p>

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
                              type="time"
                              value={slot[0]}
                              onChange={(e) => handleTimeChange(day, index, "start", e.target.value)}
                            />
                            <span>-</span>
                            <input
                              type="time"
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

              <button className="save-btn" onClick={updateAvailability}>Save Availability</button>
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
                  onSelectSlot={(slotInfo) => {
                    const title = window.prompt("Enter Event Title:");
                    if (title) {
                      setEvents([...events, { start: slotInfo.start, end: slotInfo.end, title }]);
                    }
                  }}
                  onSelectEvent={(event) => {
                    const newTitle = window.prompt("Edit Event Title:", event.title);
                    if (newTitle) {
                      setEvents(events.map((e) => (e === event ? { ...e, title: newTitle } : e)));
                    }
                  }}
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