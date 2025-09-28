import React from "react";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span>
          {task.text} <small className="category">[{task.category}]</small>
        </span>
      </label>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ❌
      </button>
    </li>
  );
}

export default TaskItem;
