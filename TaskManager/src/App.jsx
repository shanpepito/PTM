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

  const addTask = (text, category) => {
    setTasks([...tasks, { id: Date.now(), text, category, completed: false }]);
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
    <div className="app-layout">
      {/* Sidebar */}
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

      {/* Main content */}
      <div className="app-container">
        <h1 className="title">📋 Task Manager</h1>
        <TaskInput onAdd={addTask} />

        <TaskList
          title="Tasks"
          tasks={filteredTasks.filter((t) => !t.completed)}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        <TaskList
          title="Completed"
          tasks={filteredTasks.filter((t) => t.completed)}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
