import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>DevPro</h2>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/goals">Goals</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/github">Github</Link>
      <Link to="/skills">Skills</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/profile">Profile</Link>
      
    </div>
  );
}

export default Sidebar;