import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const userName =
    localStorage.getItem("userName") || "User";

  const profileImage =
    localStorage.getItem("profileImage");

  const [dashboardData, setDashboardData] = useState({
    totalGoals: 0,
    totalTasks: 0,
    completedTasks: 0,
    goalProgress: 0,
    currentStreak: 0,
  });

  const chartData = [
    { day: "Mon", tasks: 2 },
    { day: "Tue", tasks: 4 },
    { day: "Wed", tasks: 3 },
    { day: "Thu", tasks: 6 },
    { day: "Fri", tasks: 5 },
    { day: "Sat", tasks: 7 },
    { day: "Sun", tasks: 4 },
  ];

  useEffect(() => {
    fetchDashboard();

    API.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await API.get("/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const goToProfile = () => {
    // IMPORTANT FIX (prevents history issue)
    navigate("/profile", { replace: true });
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="dashboard-content">

        {/* Header */}
        <div className="dashboard-header">

          <div>
            <h1>Welcome, {userName} 👋</h1>
            <p className="dashboard-subtitle">
              Here's your productivity overview today
            </p>
          </div>

          {/* Profile Image */}
          <img
            src={
              profileImage
                ? profileImage
                : `https://ui-avatars.com/api/?name=${userName}&background=6c4fff&color=fff`
            }
            alt="Profile"
            className="profile-pic"
            onClick={goToProfile}
            title="Open Profile"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #6c4fff",
              cursor: "pointer",
            }}
          />
        </div>

        {/* Stats */}
        <div className="stats-grid">

          <div className="stat-card">
            <h3>Tasks Completed</h3>
            <h2>{dashboardData.completedTasks}</h2>
          </div>

          <div className="stat-card">
            <h3>Goal Progress</h3>
            <h2>{dashboardData.goalProgress}%</h2>
          </div>

          <div className="stat-card">
            <h3>Current Streak</h3>
            <h2>{dashboardData.currentStreak} Days</h2>
          </div>

        </div>

        {/* Bottom */}
        <div className="dashboard-bottom">

          <div className="dashboard-card chart-card">
            <h3>Productivity Overview</h3>

            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#6c4fff"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="dashboard-card task-card">
            <h3>Recent Tasks</h3>

            {tasks.length > 0 ? (
              tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="task-item">
                  {task.completed ? "✅" : "⭕"} {task.taskName}
                </div>
              ))
            ) : (
              <div className="task-item">
                No tasks added yet
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;