import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Analytics() {
  const [analytics, setAnalytics] = useState({
    focusTime: 0,
    tasksDone: 0,
    totalGoals: 0,
    activeDays: 0,
    completionRate: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/analytics"
      );

      const data = await response.json();

      setAnalytics(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">

        <div className="analytics-header">
          <h1>Productivity Analytics</h1>

          <select className="time-filter">
            <option>This Week</option>
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Focus Time</h3>
            <h2>{analytics.focusTime} hrs</h2>
          </div>

          <div className="stat-card">
            <h3>Tasks Done</h3>
            <h2>{analytics.tasksDone}</h2>
          </div>

          <div className="stat-card">
            <h3>Goals Achieved</h3>
            <h2>{analytics.totalGoals}</h2>
          </div>

          <div className="stat-card">
            <h3>Active Days</h3>
            <h2>{analytics.activeDays}</h2>
          </div>

        </div>

        <div className="chart-section">
          <h2>Productivity Overview</h2>

          <div
            className="chart-box"
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "20px",
              height: "250px",
              marginTop: "20px",
            }}
          >

            <div className="chart-item">
              <div className="bar" style={{ height: "80px" }}></div>
              <p>Jan</p>
            </div>

            <div className="chart-item">
              <div className="bar" style={{ height: "120px" }}></div>
              <p>Feb</p>
            </div>

            <div className="chart-item">
              <div className="bar" style={{ height: "150px" }}></div>
              <p>Mar</p>
            </div>

            <div className="chart-item">
              <div className="bar" style={{ height: "100px" }}></div>
              <p>Apr</p>
            </div>

            <div className="chart-item">
              <div className="bar" style={{ height: "170px" }}></div>
              <p>May</p>
            </div>

            <div className="chart-item">
              <div className="bar" style={{ height: "140px" }}></div>
              <p>Jun</p>
            </div>

            <div className="chart-item">
              <div className="bar" style={{ height: "190px" }}></div>
              <p>Jul</p>
            </div>

          </div>
        </div>

        <div className="completion-section">
          <h2>Task Completion Rate</h2>

          <div className="progress-circle">
            <span>{analytics.completionRate}%</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Analytics;
    