import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Skills() {
  const API_URL = "http://localhost:8080/api/skills";

  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [skillName, setSkillName] = useState("");

  const skillLogos = {
    Java:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    Python:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    JavaScript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    React:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    HTML:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    CSS:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "Spring Boot":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    MySQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    MongoDB:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    Git:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    GitHub:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    Postman:
      "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
  };

  const loadSkills = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const addSkill = async () => {
    if (skillName.trim() === "") return;

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skillName,
        progress: 30,
      }),
    });

    setSkillName("");
    setShowForm(false);
    loadSkills();
  };

  const deleteSkill = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      loadSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const getRecommendation = (skill) => {
    if (skill.progress < 50) {
      return "Focus on basics and daily practice";
    } else if (skill.progress < 75) {
      return "Build small projects";
    } else {
      return "Start advanced real-world projects";
    }
  };

  const avgProgress =
    skills.length === 0
      ? 0
      : skills.reduce((sum, s) => sum + s.progress, 0) / skills.length;

  const careerLevel =
    avgProgress < 40
      ? "Beginner Developer"
      : avgProgress < 70
      ? "Intermediate Developer"
      : "Job Ready Developer";

  const categories = {
    Programming: ["Java", "Python", "JavaScript"],
    Frontend: ["React", "HTML", "CSS"],
    Backend: ["Spring Boot", "Node.js", "REST API"],
    Database: ["MySQL", "MongoDB"],
    Tools: ["Git", "GitHub", "Postman"],
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">

        <h1>Skills Dashboard</h1>

        <div
          style={{
            padding: "10px",
            background: "#f3f4f6",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h3>Career Readiness: {careerLevel}</h3>
          <p>Average Skill Score: {Math.round(avgProgress)}%</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          + Add Skill
        </button>

        {showForm && (
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Enter Skill Name"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              style={{
                padding: "8px",
                marginRight: "10px",
              }}
            />

            <button
              onClick={addSkill}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Save Skill
            </button>
          </div>
        )}

        <h2>Skill Categories</h2>

        {Object.keys(categories).map((cat) => (
          <div key={cat} style={{ marginBottom: "5px" }}>
            <strong>{cat}</strong> : {categories[cat].join(", ")}
          </div>
        ))}

        <h2 style={{ marginTop: "20px" }}>My Skills</h2>

        {skills.map((skill) => (
          <div
            key={skill.id}
            style={{
              padding: "10px",
              marginBottom: "8px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={
                    skillLogos[skill.skillName] ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={skill.skillName}
                  width="35"
                  height="35"
                />

                <h3 style={{ margin: 0 }}>
                  {skill.skillName}
                </h3>
              </div>

              <button
                onClick={() => deleteSkill(skill.id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  fontSize: "11px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>

            <div
              style={{
                width: "100%",
                background: "#e5e7eb",
                height: "10px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  width: `${skill.progress}%`,
                  background: "#22c55e",
                  height: "10px",
                  borderRadius: "10px",
                }}
              ></div>
            </div>

            <p style={{ fontSize: "13px", margin: "6px 0" }}>
              {skill.progress}% completed
            </p>

            <p style={{ color: "gray", margin: 0 }}>
              💡 {getRecommendation(skill)}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Skills;