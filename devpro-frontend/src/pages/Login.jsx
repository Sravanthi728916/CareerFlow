import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });
       if (response.data === "Login Successful") {
  alert("Login Successful");

  localStorage.setItem("isLoggedIn", "true");

  navigate("/dashboard");
}
       else {
        alert(response.data);
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-container">
      {/* Back to Home */}
      <Link to="/" className="back-home">
        ← Back to Home
      </Link>

      <div className="auth-card">
        <h2>        Welcome Back</h2>

        <p className="subtitle">
          Login to continue your journey
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p className="switch-text">
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#8f7bff",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;