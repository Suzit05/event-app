import React, { useEffect, useState } from 'react';
import "../styles/Booking.css";
import Menu from '../Components/Menu';
import cnnctlogo from "../assets/images/cnnctlogo.png";



const Booking = () => {

  //booking page pr kaam kro
  //participants list pr kaam kro00000000000000000

  const [activeTab, setActiveTab] = useState("upcoming");
  const [meetings, setMeetings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null); // Store user data

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


    const fetchUser = async () => { //added now to get logged in user
      try {
        const res = await fetch("http://localhost:5001/api/user/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error(`Failed to fetch user. Status: ${res.status}`);

        const userData = await res.json();
        setLoggedInUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchMeetings();
    fetchUser();
  }, []);


  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/api/meeting/updatestatus/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Status update response:", data);

      // Update UI after status change
      setMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting._id === id ? { ...meeting, status: newStatus } : meeting
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
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


  //.......added
  if (!loggedInUser) return <p>Loading...</p>; // Show loading if user data is not fetched yet

  const fullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  //......added
  const upcomingMeetings = meetings.filter(
    (meeting) => isUpcoming(meeting.date) && meeting.status === "active"
  );

  const pastMeetings = meetings.filter(
    (meeting) => !isUpcoming(meeting.date) && meeting.status === "active"
  );

  const pendingMeetings = meetings.filter(
    (meeting) => meeting.status === "pending" || (meeting.hostName !== fullName && meeting.status === "pending")
  );

  const cancelledMeetings = meetings.filter(
    (meeting) => meeting.status === "rejected"
  );

  const getMeetingsByTab = () => {
    if (activeTab === "upcoming") return upcomingMeetings;
    if (activeTab === "past") return pastMeetings;
    if (activeTab === "pending") return pendingMeetings;
    if (activeTab === "cancelled") return cancelledMeetings;
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
            {["upcoming", "past", "pending", "cancelled"].map((tab) => (
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
              getMeetingsByTab().map((meeting) => {
                console.log("Meeting Data:", meeting);
                console.log("Raw addEmails:", meeting.addEmails);
                // Extract the number of attendees from addEmails
                const attendeesCount = Array.isArray(meeting.addEmails) ? meeting.addEmails.length : 0;

                console.log(attendeesCount)
                return (

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
                      {activeTab === "pending" ? (
                        <>
                          <button className="accept-btn" onClick={() => handleStatusUpdate(meeting._id, "active")}>
                            Accept
                          </button>
                          <button className="reject-btn" onClick={() => handleStatusUpdate(meeting._id, "rejected")}>
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className={`status-label ${meeting.status}`}>{meeting.status}</span>
                      )}
                      <span className="attendees">👥 {attendeesCount} people</span>
                    </div>
                  </div>
                )
              })
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
