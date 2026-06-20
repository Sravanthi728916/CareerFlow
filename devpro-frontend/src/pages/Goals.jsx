import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/api";

function Goals() {
  const [showForm, setShowForm] = useState(false);

  const [goals, setGoals] = useState([]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetDate: "",
    category: "",
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await API.get("/goals");
      setGoals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNewGoal({
      ...newGoal,
      [e.target.name]: e.target.value,
    });
  };

  const addGoal = async () => {
    try {
      await API.post("/goals", newGoal);

      alert("Goal Saved Successfully");

      setNewGoal({
        title: "",
        description: "",
        targetDate: "",
        category: "",
      });

      setShowForm(false);

      fetchGoals();
    } catch (error) {
      console.log(error);
      alert("Failed to Save Goal");
    }
  };

  const deleteGoal = async (id) => {
    try {
      await API.delete(`/goals/${id}`);

      alert("Goal Deleted Successfully");

      fetchGoals();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Goal");
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">

        <div className="page-header">
          <h1>My Goals</h1>

          <button
            className="add-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Goal
          </button>
        </div>

        {showForm && (
          <div className="goal-form-container">

            <h2>Add New Goal</h2>

            <input
              type="text"
              name="title"
              placeholder="Goal Title"
              value={newGoal.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={newGoal.description}
              onChange={handleChange}
            />

            <input
              type="date"
              name="targetDate"
              value={newGoal.targetDate}
              onChange={handleChange}
            />

            <select
              name="category"
              value={newGoal.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Learning">Learning</option>
              <option value="Coding">Coding</option>
              <option value="Projects">Projects</option>
              <option value="Career">Career</option>
              <option value="Internship">Internship</option>
              <option value="Placement">Placement</option>
              <option value="Health">Health</option>
              <option value="Personal Development">
                Personal Development
              </option>
            </select>

            <button
              className="save-btn"
              onClick={addGoal}
            >
              Save Goal
            </button>

          </div>
        )}

        <div className="goals-list">

          {goals.length === 0 ? (
            <p>No Goals Added Yet</p>
          ) : (
            goals.map((goal) => (
              <div className="goal-card" key={goal.id}>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3>{goal.title}</h3>

                  <button
                    className="delete-btn"
                    onClick={() => deleteGoal(goal.id)}
                  >
                    Delete
                  </button>
                </div>

                <p>{goal.description}</p>

                <p>
                  <strong>Target Date:</strong>{" "}
                  {goal.targetDate || "Not Set"}
                </p>

                <p>
                  <strong>Category:</strong> {goal.category}
                </p>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default Goals;