import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Tasks() {
  const API_URL = "http://localhost:8080/api/tasks";

  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [taskName, setTaskName] = useState("");
  const [skillName, setSkillName] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  const loadTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (taskName.trim() === "") return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName,
          skillName,
          completed: false,
        }),
      });

      setTaskName("");
      setSkillName("");
      setShowForm(false);

      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/complete`, {
        method: "PUT",
      });

      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.taskName);
  };

  const saveEdit = async (id) => {
    alert("Edit API not created yet");
    setEditingId(null);
  };

  const allCompleted =
    tasks.length > 0 &&
    tasks.every((task) => task.completed);

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">

        <div className="page-header">
          <h1>My Tasks</h1>

          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "6px",
            }}
          >
            + Add Task
          </button>
        </div>

        <p>
          Welcome, <b>{username || "User"}</b> 🚀
        </p>

        {showForm && (
          <div style={{ margin: "15px 0" }}>

            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              style={{
                padding: "8px",
                marginRight: "10px",
              }}
            />

            <input
              type="text"
              placeholder="Skill Name (Java, React...)"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              style={{
                padding: "8px",
                marginRight: "10px",
              }}
            />

            <button
              onClick={addTask}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
              }}
            >
              Save
            </button>

          </div>
        )}

        <div>

          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ddd",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                {editingId === task.id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) =>
                        setEditText(e.target.value)
                      }
                    />

                    <button
                      onClick={() => saveEdit(task.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <div>
                    <b>{task.taskName}</b>
                    <br />
                    <small>
                      Skill: {task.skillName}
                    </small>
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                <button
                  onClick={() => startEdit(task)}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  ✏️
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "red",
                  }}
                >
                  🗑
                </button>
              </div>

            </div>
          ))}

        </div>

        {allCompleted && (
          <div style={{ marginTop: "20px" }}>
            🎉 All Tasks Completed! Keep Going 🚀
          </div>
        )}

      </div>
    </div>
  );
}

export default Tasks;