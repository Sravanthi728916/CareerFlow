import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Sidebar from "../components/Sidebar";

function CalendarPage() {
  const [date, setDate] = useState(new Date());

  const completedDates = [
    "2026-06-10",
    "2026-06-15",
    "2026-06-18"
  ];

  const pendingDates = [
    "2026-06-12",
    "2026-06-20"
  ];

  const formatDate = (d) => {
    return d.toISOString().split("T")[0];
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">

        <h1>Calendar & Schedule</h1>

        <div className="calendar-wrapper">

          <Calendar
            onChange={setDate}
            value={date}
            className="custom-calendar"
            tileContent={({ date }) => {

              const day = formatDate(date);

              if (completedDates.includes(day)) {
                return <div className="green-dot"></div>;
              }

              if (pendingDates.includes(day)) {
                return <div className="red-dot"></div>;
              }

              return null;
            }}
          />

        </div>

        <div className="selected-date-card">

          <h2>
            {date.toDateString()}
          </h2>

          <div className="event-item">
            09:00 AM - DSA Practice
          </div>

          <div className="event-item">
            11:00 AM - React Development
          </div>

          <div className="event-item">
            03:00 PM - Goal Review
          </div>

        </div>

      </div>
    </div>
  );
}

export default CalendarPage;