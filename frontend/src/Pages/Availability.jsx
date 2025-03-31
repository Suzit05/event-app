import React, { useState, useEffect } from "react";
import Menu from "../Components/Menu";
import CalendarComponent from "../Components/CalenderComponent";
import "../styles/Availability.css";
import { FaRegCopy } from "react-icons/fa";

const Availability = () => {
  //css left for this page and setting and check once the working and then deploy😎
  const [view, setView] = useState("availability"); // Default view
  const [events, setEvents] = useState([]);
  const [availability, setAvailability] = useState({
    Sun: { checked: false, slots: [["", ""]] },
    Mon: { checked: false, slots: [["", ""]] },
    Tue: { checked: false, slots: [["", ""]] },
    Wed: { checked: false, slots: [["", ""]] },
    Thu: { checked: false, slots: [["", ""]] },
    Fri: { checked: false, slots: [["", ""]] },
    Sat: { checked: false, slots: [["", ""]] },
  });

  useEffect(() => {
    fetchAvailability(); // Load availability when component mounts
  }, []);

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

  const updateAvailability = async () => {
    const formattedAvailability = Object.entries(availability)
      .filter(([_, { checked }]) => checked)
      .flatMap(([day, { slots }]) =>
        slots
          .filter(([start, end]) => start && end)
          .map(([startTime, endTime]) => ({
            day,
            startTime,
            endTime,
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
                <span className="activity">
                  Activity <span className="dropdown">▼ Event type</span>
                </span>
                <span className="timezone">
                  Time Zone <span className="dropdown">▼ Indian Time Standard</span>
                </span>
              </div>

              <div className="availability-list">
                {Object.entries(availability).map(([day, { checked, slots }]) => (
                  <div className="day-row" key={day}>
                    <input type="checkbox" checked={checked} onChange={() => {
                      setAvailability((prev) => ({
                        ...prev,
                        [day]: { ...prev[day], checked: !prev[day].checked },
                      }));
                    }} />
                    <span className="day-name">{day}</span>

                    {checked ? (
                      <div className="slots-container">
                        {slots.map((slot, index) => (
                          <div className="slot" key={index}>
                            <input
                              type="time"
                              value={slot[0]}
                              onChange={(e) => {
                                const updatedSlots = [...availability[day].slots];
                                updatedSlots[index][0] = e.target.value;
                                setAvailability((prev) => ({
                                  ...prev,
                                  [day]: { ...prev[day], slots: updatedSlots },
                                }));
                              }}
                            />
                            <span>-</span>
                            <input
                              type="time"
                              value={slot[1]}
                              onChange={(e) => {
                                const updatedSlots = [...availability[day].slots];
                                updatedSlots[index][1] = e.target.value;
                                setAvailability((prev) => ({
                                  ...prev,
                                  [day]: { ...prev[day], slots: updatedSlots },
                                }));
                              }}
                            />
                            <button className="remove-btn" onClick={() => {
                              setAvailability((prev) => ({
                                ...prev,
                                [day]: {
                                  ...prev[day],
                                  slots: prev[day].slots.filter((_, i) => i !== index),
                                },
                              }));
                            }}>✖</button>
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

              <button className="save-btn" onClick={updateAvailability}>
                Save Availability
              </button>
            </div>
          ) : (
            <CalendarComponent events={events} setEvents={setEvents} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Availability;
