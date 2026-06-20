import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        fullName,
        email,
        password,
      });

      alert(res.data || "Registration Successful");

      // Save user details
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", fullName);

      // Clear form
      setFullName("");
      setEmail("");
      setPassword("");

      // Go to Profile page
      navigate("/profile");

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data || "Registration Failed");
      } else {
        alert("Registration Failed");
      }
    }
  };

  return (
    <div className="auth-container">
      {/* Back to Home */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          cursor: "pointer",
          fontWeight: "600",
          color: "black",
        }}
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </div>

      <div className="auth-card">
        <h2>Create Account</h2>

        <p className="subtitle">
          Fill in your details to register
        </p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Register
          </button>
        </form>

        <p className="switch-text">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              cursor: "pointer",
              color: "#8f7bff",
              fontWeight: "600",
            }}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;