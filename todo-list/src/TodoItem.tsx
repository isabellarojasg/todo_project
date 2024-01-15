import React, { useState } from "react";
import "./styles.css";

function TodoItem(props: any) {
  const [isChecked, setChecked] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleTextInputChange = (event: any) => {
    setTextInputValue(event.target.value);
  };

  return (
    <div key={props.index} className="todo-item-container">
      {textInputValue && (
        <input
          className="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      )}
      <input
        className={`todo-item font-style ${
          isChecked ? "completed-todo-item" : ""
        }`}
        type="text"
        value={textInputValue}
        onChange={handleTextInputChange}
      />
    </div>
  );
}

export default TodoItem;
