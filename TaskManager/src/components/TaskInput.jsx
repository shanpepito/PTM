import React, { useState } from "react";

// For Inputting Tasks and Selecting Category and Deadline
function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [deadline, setDeadline] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    onAdd(text, category, deadline);
    setText("");
    setCategory("General");
    setDeadline("");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new task..."
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        <option value="General">General</option>
        <option value="Home">Home</option>
        <option value="School">School</option>
        <option value="Personal">Personal</option>
        <option value="Organization">Organization</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="date-input"
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default TaskInput;
