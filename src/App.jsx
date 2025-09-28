import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, category, deadline) => {
    setTasks([...tasks, { id: Date.now(), text, category, deadline, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on selected category
  const filteredTasks = tasks.filter((task) =>
    filter === "All" ? true : task.category === filter
  );

  return (
    <div className="app-container">
      <h1 className="title">📋 Task Manager</h1>

      <div className="app-content">
        {/* Sidebar Category Button */}
        <aside className="sidebar">
          <h2>Categories</h2>
          <button
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={filter === "Home" ? "active" : ""}
            onClick={() => setFilter("Home")}
          >
            Home
          </button>
          <button
            className={filter === "School" ? "active" : ""}
            onClick={() => setFilter("School")}
          >
            School
          </button>
          <button
            className={filter === "Personal" ? "active" : ""}
            onClick={() => setFilter("Personal")}
          >
            Personal
          </button>
          <button
            className={filter === "Organization" ? "active" : ""}
            onClick={() => setFilter("Organization")}
          >
            Organization
          </button>
        </aside>

        {/* Main Tasks Section */}
        <div className="task-section">
          <TaskInput onAdd={addTask} />
          
          {/* Task Lists */}
          <div className="tasks-panel">
            <TaskList
              title="Tasks"
              tasks={filteredTasks.filter((t) => !t.completed)}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>

          {/* Completed Tasks */}
          <div className="completed-panel">
            <TaskList
              title="Completed"
              tasks={filteredTasks.filter((t) => t.completed)}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
