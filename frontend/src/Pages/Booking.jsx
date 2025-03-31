import React, { useEffect, useRef, useState } from 'react';
import "../styles/Booking.css";
import Menu from '../Components/Menu';
import cnnctlogo from "../assets/images/cnnctlogo.png";
import { TiTick } from "react-icons/ti";
import { toast, ToastContainer } from 'react-toastify';  // Import toast
import 'react-toastify/dist/ReactToastify.css';  // Import CSS


const Booking = () => {
  //availability bnao...........and conflictt

  const [activeTab, setActiveTab] = useState("upcoming");
  const [meetings, setMeetings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null); // Store user data
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/meeting/getmeetings", {
          method: "GET",
          credentials: "include",
          cache: "no-store", // Prevents caching issues 
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








  const handleStatusUpdate = async (meetingId, newStatus) => {
    if (!loggedInUser) return;

    try {
      const response = await fetch(`http://localhost:5001/api/meeting/respond`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingId,
          email: loggedInUser.email,
          status: newStatus === "accepted" ? "accepted" : "rejected",
        }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (!data.meeting) {
        console.error("Meeting update failed!");
        return;
      }

      // force a refresh of the meetings list
      const refreshResponse = await fetch("http://localhost:5001/api/meeting/getmeetings", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (refreshResponse.ok) {
        const refreshedData = await refreshResponse.json();
        setMeetings(refreshedData);
      }

      // optionally switch to upcoming tab after acceptance
      if (newStatus === "accepted") {
        setActiveTab("upcoming");
      } else {
        setActiveTab("cancelled");
      }

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
  const upcomingMeetings = meetings.filter(meeting => {
    const isParticipant = meeting.addEmails?.includes(loggedInUser.email);
    const isHost = meeting.hostName === fullName;
    const userStatus = meeting.participants?.find(p => p.email === loggedInUser.email)?.status;

    return isUpcoming(meeting.date) && (
      // Show if:
      // - Meeting is active and user is participant/host
      (meeting.status === "active" && (isParticipant || isHost)) ||
      // - User is host (regardless of status)
      isHost ||
      // - User has accepted/rejected but meeting is still pending (other participants haven't responded)
      (userStatus && userStatus !== "pending" && meeting.status === "pending")
    );
  });

  const pastMeetings = meetings.filter(meeting =>
    !isUpcoming(new Date(meeting.date)) &&
    meeting.status === "active" &&
    (meeting.hostName === fullName || meeting.addEmails?.includes(loggedInUser.email))
  );

  const pendingMeetings = meetings.filter(meeting => {
    const isParticipant = meeting.addEmails?.includes(loggedInUser.email);
    const userStatus = meeting.participants?.find(p => p.email === loggedInUser.email)?.status;

    return (
      meeting.status === "pending" &&
      meeting.hostName !== fullName &&
      isParticipant &&
      (!userStatus || userStatus === "pending") // Only show if user hasn't responded
    );
  });

  const cancelledMeetings = meetings.filter(meeting => {
    const isParticipant = meeting.addEmails?.includes(loggedInUser.email);
    return (
      (meeting.status === "rejected" ||
        (meeting.participants?.some(p => p.status === "rejected"))) &&
      (meeting.hostName === fullName || isParticipant)
    );
  });

  //upr tk


  const getMeetingsByTab = () => {
    if (activeTab === "upcoming") return upcomingMeetings;
    if (activeTab === "past") return pastMeetings;
    if (activeTab === "pending") return pendingMeetings;
    if (activeTab === "cancelled") return cancelledMeetings;
    return [];
  };

  const fetchAttendeeNames = async (emails) => {
    try {
      const response = await fetch("http://localhost:5001/api/user/getUsersByEmails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensures authentication is sent
        body: JSON.stringify({ emails }),
      });

      if (!response.ok) throw new Error(`Failed to fetch attendee names. Status: ${response.status}`);

      const data = await response.json(); // Expected to return an array of { email, firstname ,lastname }
      console.log("🔹 Backend Response:", data); // Check the actual data structure
      return data;
    } catch (error) {
      console.error("Error fetching attendee names:", error.message);
      return [];
    }
  };



  const handleShowAttendees = async (meeting) => {
    if (!Array.isArray(meeting.addEmails) || meeting.addEmails.length === 0) {
      return;
    }

    try {
      const attendeesData = await fetchAttendeeNames(meeting.addEmails);
      const foundEmails = attendeesData.map(user => user.email);
      const notFoundEmails = meeting.addEmails.filter(email => !foundEmails.includes(email));

      // Create enhanced attendees list with status
      const attendeesList = attendeesData.map(user => {
        const participantStatus = meeting.participants?.find(p => p.email === user.email)?.status || 'pending';
        return {
          name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName || user.email,
          email: user.email,
          status: participantStatus
        };
      });

      // Add unknown emails with pending status
      notFoundEmails.forEach(email => {
        const participantStatus = meeting.participants?.find(p => p.email === email)?.status || 'pending';
        attendeesList.push({
          name: email,
          email: email,
          status: participantStatus
        });
      });

      setSelectedAttendees(attendeesList);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };





  return (
    <div className='booking-outside-container'>
      <ToastContainer />
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
                          <button
                            className="accept-btn"
                            onClick={() => handleStatusUpdate(meeting._id, "accepted")}
                          >
                            Accept
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() => handleStatusUpdate(meeting._id, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className={`status-label ${meeting.status}`}>{meeting.status}</span>
                      )}

                      <span
                        className="attendees"
                        onClick={() => handleShowAttendees(meeting)}
                        style={{ cursor: "pointer", textDecoration: "underline" }}
                      >
                        👥 {attendeesCount} people
                      </span>


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



      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container" ref={popupRef}>
            <div className='popup-heading'>
              <h3>Participants ({selectedAttendees.length})</h3>
              <h4 className='popup-accept'>✔Accept</h4>
              <h4 className='popup-reject'>🚫Reject</h4>
            </div>

            <ul>
              {selectedAttendees.map((attendee, index) => (
                <li key={index} className="participant-item">
                  <span className="participant-name">{attendee.name}</span>
                  <span className={`participant-status ${attendee.status}`}>
                    {attendee.status === 'accepted' ? (
                      <span className="status-accepted">✓ </span>
                    ) : attendee.status === 'rejected' ? (
                      <span className="status-rejected">✗ </span>
                    ) : (
                      <span className="status-pending">⌛ Pending</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowPopup(false)}
              className="close-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}



    </div>

  );

};

export default Booking;
