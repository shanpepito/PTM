import React, { useState } from "react";

function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");

  const handleAdd = () => {
    if (text.trim() === "") return;
    onAdd(text, category);
    setText("");
    setCategory("General");
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
        <option value="Work">Work</option>
        <option value="School">School</option>
        <option value="Personal">Personal</option>
      </select>

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default TaskInput;
