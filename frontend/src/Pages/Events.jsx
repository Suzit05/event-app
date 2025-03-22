import React, { useState } from "react";
import "../styles/Events.css";

const Events = () => {
    //backend se jodo............g/////////////////
    const [eventTopic, setEventTopic] = useState("");
    const [password, setPassword] = useState("");
    const [hostName, setHostName] = useState("Sarthak Pal");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("02:30");
    const [period, setPeriod] = useState("PM");
    const [timezone, setTimezone] = useState("(UTC +5:00 Delhi)");
    const [duration, setDuration] = useState("1 hour");

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
                    <select value={hostName} onChange={(e) => setHostName(e.target.value)}>
                        <option value="Sarthak Pal">Sarthak Pal</option>
                        <option value="Other Host">Other Host</option>
                    </select>
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
                        <select value={time} onChange={(e) => setTime(e.target.value)}>
                            <option>02:30</option>
                            <option>03:00</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                            <option>AM</option>
                            <option>PM</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
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

                <div className="button-group">
                    <button className="cancel-btn">Cancel</button>
                    <button className="save-btn">Save</button>
                </div>
            </div>
        </div>
    );
};

export default Events;
