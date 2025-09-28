import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // Load tasks from localStorage
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

  // Filter logic
  const filteredTasks = tasks.filter((task) =>
    filter === "All" ? true : task.category === filter
  );

  return (
    <div className="app-container">
      <h1 className="title">📋 Task Manager</h1>

      <div className="app-content">
        {/* Sidebar inside app-container */}
        <aside className="sidebar">
          <h2>Categories</h2>
          <button
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={filter === "Work" ? "active" : ""}
            onClick={() => setFilter("Work")}
          >
            Work
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
        </aside>

        {/* Main tasks section */}
        <div className="task-section">
          <TaskInput onAdd={addTask} />
          
          {/* Tasks */}
          <div className="tasks-panel">
            <TaskList
              title="Tasks"
              tasks={filteredTasks.filter((t) => !t.completed)}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>

          {/* Completed */}
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
