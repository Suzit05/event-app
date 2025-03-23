import React, { useEffect, useState } from 'react'
import Menu from '../Components/Menu';
import "../styles/Meetings.css"
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const Meetings = () => {
    const navigate = useNavigate()
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
            month: "long"
        });
    };



    //to find endTime
    const calculateEndTime = (startTime, duration) => {
        let [time, period] = startTime.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        // Convert to 24-hour format
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        // Add duration
        if (duration === 1) {
            hours += 1;
        } else if (duration === 0.5) {
            minutes += 30;
            if (minutes >= 60) {
                minutes -= 60;
                hours += 1;
            }
        }

        // Convert back to 12-hour format
        let newPeriod = hours >= 12 ? "PM" : "AM";
        if (hours > 12) hours -= 12;
        if (hours === 0) hours = 12; // Midnight case

        return `${hours}:${minutes.toString().padStart(2, "0")} ${newPeriod}`;
    };


    const [meetings, setMeetings] = useState([]);
    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/meeting/getmeetings", {
                    method: "GET",
                    credentials: "include",  // Important for sending cookies
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



    return (
        <div className='meetings-outside-container'>
            <div className='meetings-menu-container'>
                <Menu />
            </div>
            <div className='meetings-screen-container'>
                {/**meetings compo */}
                <div className="meetings-container">
                    <div className='uppertext-container'>
                        <div>
                            <h2 className="meetings-title">Event Types</h2>
                            <p className="meetings-subtitle">
                                Create events to share for people to book on your calendar.
                            </p>
                        </div>
                        <div>
                            <button onClick={() => navigate("/create-event")} className="add-event-btn">+ Add New Event</button>
                        </div>
                    </div>

                    <div className="meetings-grid">
                        {meetings.length > 0 ? (
                            meetings.map((meeting, index) => (
                                <div
                                    key={index}
                                    className="meeting-card"
                                    style={{ borderTopColor: index % 2 === 0 ? "blue" : "gray" }}
                                >
                                    <div className="meeting-header">
                                        <h3>{meeting.eventTopic}</h3>
                                        <FaRegEdit className="edit-icon" />
                                    </div>
                                    <p className="meeting-date">{formatDate(meeting.date)}</p>

                                    <p className="meeting-time">
                                        {meeting.startTime} - {calculateEndTime(meeting.startTime, meeting.duration)}
                                    </p>
                                    <p className="meeting-type">Duration: {meeting.duration} hour</p>
                                    <div className="meeting-footer">
                                        <div className='meeting-footer-inside'>
                                            <div> <label className="toggle-switch">
                                                <input type="checkbox" defaultChecked={index % 2 === 0} />
                                                <span className="slider"></span>
                                            </label></div>
                                            <div onClick={() => copyToClipboard(meeting.addLink)}>
                                                <IoCopyOutline className='copy-icon' />
                                            </div>


                                            <div><FaTrash className="delete-icon" /></div>
                                        </div>

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
    )
}

export default Meetings 