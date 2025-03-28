import React, { useState, useEffect } from "react";
import "../styles/Events.css";
import { useNavigate } from "react-router-dom";

//this is create evvent in reality

const Events = () => {
    const [eventId, setEventId] = useState(null); // ✅ Store eventId
    const [eventTopic, setEventTopic] = useState("");
    const [password, setPassword] = useState("");
    const [hostName, setHostName] = useState(""); // Empty initially
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [starttime, setStartTime] = useState("09:00"); // Default start time
    const [period, setPeriod] = useState("AM");
    const [timezone, setTimezone] = useState("(UTC +5:00 Delhi)");
    const [duration, setDuration] = useState("1 hour");
    const [addLink, setaddLink] = useState("");
    const [addEmails, setaddEmails] = useState("");

    // Generate time options (every 30 mins from 9:00 AM to 11:30 PM)
    const timeOptions = [];
    for (let hour = 1; hour <= 12; hour++) {
        timeOptions.push(`${hour.toString().padStart(2, "0")}:00`);
        timeOptions.push(`${hour.toString().padStart(2, "0")}:30`);
    }

    // Fetch the authenticated user's name
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

    const handleSaveEvent = async (e) => {
        e.preventDefault() //reset form data
        const durationMapping = { "30 mins": 0.5, "1 hour": 1 };

        const eventData = {
            eventTopic,
            password,
            hostName,
            description,
            date: new Date(date),
            startTime: starttime,
            duration: durationMapping[duration],
            period,
            addLink,
            addEmails: addEmails.split(","), // Convert to an array
            timezone,
        };

        try {
            const response = await fetch("http://localhost:5001/api/meeting/addEvent", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Meeting created successfully!");
                // ✅ Reset form fields after successful save
                setEventTopic("");
                setPassword("");
                setDescription("");
                setDate("");
                setStartTime("09:00");
                setPeriod("AM");
                setTimezone("(UTC +5:00 Delhi)");
                setDuration("1 hour");
                setaddLink("");
                setaddEmails("");

            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create meeting.");
        }
    };

    return (
        <div className="create-event-container">
            <div className="title-div">
                <h2 className="create-event-title">Create Event</h2>
                <p className="create-event-subtitle">
                    Create events to share for people to book on your calendar.
                </p>
            </div>

            <div className="create-event-card">
                <h3 className="event-header">Add Event</h3>

                <div className="form-group">
                    <label>Event Topic <span className="required">*</span></label>
                    <input
                        type="text"
                        placeholder="Set a conference topic before it starts"
                        value={eventTopic}
                        onChange={(e) => setEventTopic(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Host Name <span className="required">*</span></label>
                    <input type="text" value={hostName} readOnly />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="form-group-row">
                    <div className="form-group">
                        <label>Date and Time <span className="required">*</span></label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <select value={starttime} onChange={(e) => setStartTime(e.target.value)}>
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                            <option>AM</option>
                            <option>PM</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <select className="time-zone" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                            <option>(UTC +5:00 Delhi)</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Set Duration</label>
                    <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                        <option>1 hour</option>
                        <option>30 mins</option>
                    </select>
                </div>

                {/* Link and Email Input */}
                <div className="form-group">
                    <label>Add link <span className="required">*</span></label>
                    <input
                        type="text"
                        placeholder="Enter URL Here"
                        value={addLink}
                        onChange={(e) => setaddLink(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Add Emails <span className="required">*</span></label>
                    <input
                        type="text"
                        placeholder="Add member Emails (comma-separated)"
                        value={addEmails}
                        onChange={(e) => setaddEmails(e.target.value)}
                    />
                </div>

                <div className="button-group">
                    <button className="cancel-btn">Cancel</button>
                    <button className="save-btn" onClick={handleSaveEvent}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default Events;
