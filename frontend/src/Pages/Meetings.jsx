import React, { useEffect, useState } from "react";
import Menu from "../Components/Menu";
import "../styles/Meetings.css";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Meetings = () => {
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editEventTopic, setEditEventTopic] = useState("");
    const [editStartTime, setEditStartTime] = useState("");

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/meeting/getmeetings", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch meetings. Status: ${response.status}`);
                }

                const data = await response.json();
                setMeetings(data);
            } catch (error) {
                console.error("Error fetching meetings:", error.message);
            }
        };

        fetchMeetings();
    }, []);

    const copyToClipboard = (link) => {
        if (!link) {
            alert("No link available to copy.");
            return;
        }

        navigator.clipboard.writeText(link)
            .then(() => alert("Copied to clipboard!"))
            .catch((err) => console.error("Failed to copy: ", err));
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "2-digit",
            month: "long",
        });
    };

    const calculateEndTime = (startTime, duration) => {
        let [time, period] = startTime.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        if (duration === 1) {
            hours += 1;
        } else if (duration === 0.5) {
            minutes += 30;
            if (minutes >= 60) {
                minutes -= 60;
                hours += 1;
            }
        }

        let newPeriod = hours >= 12 ? "PM" : "AM";
        if (hours > 12) hours -= 12;
        if (hours === 0) hours = 12;

        return `${hours}:${minutes.toString().padStart(2, "0")} ${newPeriod}`;
    };

    const handleEditClick = (meeting) => {
        setEditingId(meeting._id);
        setEditEventTopic(meeting.eventTopic);
        setEditStartTime(meeting.startTime);
    };

    const handleSaveEdit = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/meeting/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ eventTopic: editEventTopic, startTime: editStartTime }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update meeting. Status: ${response.status}`);
            }

            const updatedMeetings = meetings.map((meeting) =>
                meeting._id === id ? { ...meeting, eventTopic: editEventTopic, startTime: editStartTime } : meeting
            );
            setMeetings(updatedMeetings);
            setEditingId(null);
        } catch (error) {
            console.error("Error updating meeting:", error.message);
        }
    };

    const handleDeleteMeeting = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this meeting?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5001/api/meeting/delete/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Failed to delete meeting. Status: ${response.status}`);
            }

            // Update state to remove deleted meeting
            setMeetings(meetings.filter(meeting => meeting._id !== id));
            alert("Meeting deleted successfully!");
        } catch (error) {
            console.error("Error deleting meeting:", error.message);
        }
    };


    return (
        <div className="meetings-outside-container">
            <div className="meetings-menu-container">
                <Menu />
            </div>
            <div className="meetings-screen-container">
                <div className="meetings-container">
                    <div className="uppertext-container">
                        <div>
                            <h2 className="meetings-title">Event Types</h2>
                            <p className="meetings-subtitle">
                                Create events to share for people to book on your calendar.
                            </p>
                        </div>
                        <div>
                            <button onClick={() => navigate("/create-event")} className="add-event-btn">
                                + Add New Event
                            </button>
                        </div>
                    </div>

                    <div className="meetings-grid">
                        {meetings.length > 0 ? (
                            meetings.map((meeting) => (
                                <div
                                    key={meeting._id}
                                    className="meeting-card"
                                    style={{ borderTopColor: "blue" }}
                                >
                                    <div className="meeting-header">
                                        {editingId === meeting._id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editEventTopic}
                                                    onChange={(e) => setEditEventTopic(e.target.value)}
                                                    className="edit-input"
                                                />
                                            </>
                                        ) : (
                                            <h3>{meeting.eventTopic}</h3>
                                        )}
                                        <FaRegEdit className="edit-icon" onClick={() => handleEditClick(meeting)} />
                                    </div>

                                    <p className="meeting-date">{formatDate(meeting.date)}</p>

                                    <p className="meeting-time">
                                        {editingId === meeting._id ? (
                                            <input
                                                type="text"
                                                value={editStartTime}
                                                onChange={(e) => setEditStartTime(e.target.value)}
                                                className="edit-input"
                                            />
                                        ) : (
                                            `${meeting.startTime} - ${calculateEndTime(meeting.startTime, meeting.duration)}`
                                        )}
                                    </p>
                                    <p className="meeting-type">Duration: {meeting.duration} hour</p>

                                    <div className="meeting-footer">
                                        <div className="meeting-footer-inside">
                                            <div>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" defaultChecked={true} />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                            <div onClick={() => copyToClipboard(meeting.addLink)}>
                                                <IoCopyOutline className="copy-icon" />
                                            </div>
                                            <div>
                                                <FaTrash className="delete-icon" onClick={() => handleDeleteMeeting(meeting._id)} />

                                            </div>
                                        </div>

                                        {editingId === meeting._id && (
                                            <button className="save-btn" onClick={() => handleSaveEdit(meeting._id)}>
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-meetings">No meetings available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Meetings;
