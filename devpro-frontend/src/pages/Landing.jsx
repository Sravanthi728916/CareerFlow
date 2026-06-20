import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Target,
  GitBranch,
  Brain,
} from "lucide-react";

function Landing() {
  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName") || "User";

  const profileImage =
    localStorage.getItem("profileImage");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("email");
    localStorage.removeItem("bio");

    alert("Logged out successfully!");

    // IMPORTANT FIX
    navigate("/", { replace: true });
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToProfile = () => {
    // IMPORTANT FIX (prevents back stack issue)
    navigate("/profile", { replace: true });
  };

  return (
    <div className="landing">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">DevPro</h2>

        <div className="nav-links">

          <a href="/">Home</a>
          <a href="/">Features</a>

          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

          {/* Profile Image */}
          <img
            src={
              profileImage
                ? profileImage
                : `https://ui-avatars.com/api/?name=${userName}&background=6c4fff&color=fff`
            }
            alt="Profile"
            onClick={goToProfile}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
              marginLeft: "15px",
              border: "2px solid #6c4fff",
            }}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">

        <div className="hero-left">
          <h1>
            Track. Improve.
            <br />
            Grow.
          </h1>

          <p>
            All-in-one platform to boost your productivity
            and accelerate your developer career.
          </p>

          <button
            className="start-btn"
            onClick={goToDashboard}
          >
            Get Started
          </button>
        </div>

        <div className="hero-right">
          <img
            src="/Developer.svg"
            alt="Developer"
            className="hero-image"
          />
        </div>

      </div>

      {/* Features */}
      <div className="features">

        <div className="feature-card">
          <BarChart3 size={40} />
          <h3>Productivity Tracking</h3>
        </div>

        <div className="feature-card">
          <Target size={40} />
          <h3>Goal Management</h3>
        </div>

        <div className="feature-card">
          <GitBranch size={40} />
          <h3>GitHub Analytics</h3>
        </div>

        <div className="feature-card">
          <Brain size={40} />
          <h3>Skill Development</h3>
        </div>

      </div>
    </div>
  );
}

export default Landing;