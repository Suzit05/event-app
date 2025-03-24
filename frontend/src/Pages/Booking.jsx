import React, { useEffect, useState } from 'react';
import "../styles/Booking.css";
import Menu from '../Components/Menu';
import cnnctlogo from "../assets/images/cnnctlogo.png";



const Booking = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [meetings, setMeetings] = useState([]);

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
  };

  const isUpcoming = (meetingDate) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const meetingDay = new Date(meetingDate).setHours(0, 0, 0, 0);
    return meetingDay >= today;
  };

  const upcomingMeetings = meetings.filter((meeting) => isUpcoming(meeting.date));
  const pastMeetings = meetings.filter((meeting) => !isUpcoming(meeting.date));

  const getMeetingsByTab = () => {
    if (activeTab === "upcoming") return upcomingMeetings;
    if (activeTab === "past") return pastMeetings;
    return [];
  };



  return (
    <div className='booking-outside-container'>
      <div className='booking-menu-container'>
        <Menu />
      </div>
      <div className='booking-screen-container'>
        <div className="booking-title-div">
          <h2 className="booking-title">Booking</h2>
          <p className="booking-subtitle">
            See upcoming and past events booked through your event type links.
          </p>
        </div>
        <div className="booking-container">
          {/* Tab Navigation */}
          <div className="booking-tabs">
            {["upcoming", "past"].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Booking Card Content */}
          <div className="booking-content">
            {getMeetingsByTab().length > 0 ? (
              getMeetingsByTab().map((meeting) => (
                <div key={meeting._id} className="booking-card">
                  <div className="booking-date">
                    <p className="booking-day">{formatDate(meeting.date)}</p>
                    <p className="booking-time">
                      {meeting.startTime} - {calculateEndTime(meeting.startTime, meeting.duration)}
                    </p>
                  </div>
                  <div className="booking-details">
                    <h3 className="booking-title">{meeting.eventTopic}</h3>

                  </div>
                  <div className="booking-status">
                    <span className="status-label accepted">Accepted</span>
                    <span className="attendees">👥 {meeting.attendees || 0} people</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">No {activeTab} meetings available.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Booking;
