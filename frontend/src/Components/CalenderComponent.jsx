import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/Calendar.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month"); // ✅ Added view state

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Fetch meetings from the backend
  const fetchMeetings = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/meeting/getmeetings", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        const formattedEvents = data.map((meeting) => {
          const startDateTime = moment(`${meeting.date} ${meeting.startTime}`, "YYYY-MM-DD HH:mm").toDate();
          const endDateTime = moment(`${meeting.date} ${meeting.endTime}`, "YYYY-MM-DD HH:mm").toDate();

          return {
            title: meeting.eventTopic,
            start: startDateTime,
            end: endDateTime,
          };
        });

        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <span className="activity">
          Activity <span className="dropdown">▼ Event type</span>
        </span>
        <span className="timezone">
          Time Zone <span className="dropdown">▼ Indian Standard Time</span>
        </span>
      </div>

      {/* Navigation Controls */}
      <div className="calendar-navigation">
        <button onClick={() => setCurrentDate(moment(currentDate).subtract(1, "months").toDate())}>‹ Prev Month</button>
        <span>{moment(currentDate).format("MMMM YYYY")}</span>
        <button onClick={() => setCurrentDate(moment(currentDate).add(1, "months").toDate())}>Next Month ›</button>
      </div>

      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events} 
          startAccessor="start"
          endAccessor="end"
          selectable
          date={currentDate}
          view={view} // ✅ Controlled view state
          onView={(newView) => setView(newView)} // ✅ Update view when user clicks Week, Day, or Agenda
          onNavigate={(date) => setCurrentDate(date)}
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
