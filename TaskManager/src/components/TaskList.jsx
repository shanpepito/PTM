import React from "react";
import TaskItem from "./TaskItem";

// For Displaying List of Tasks
function TaskList({ title, tasks, onToggle, onDelete }) {
  return (
    <div className="task-list">
      <h2>{title}</h2>
      {tasks.length === 0 ? (
        <p className="empty-text">No {title.toLowerCase()} yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
