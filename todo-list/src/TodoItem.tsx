import React, { useState, ChangeEvent } from "react";
import "./styles.css";
import { COLOURS } from "./colours";

interface TodoItemProps {
  index: number;
  isDarkMode: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ index, isDarkMode }) => {
  const [isChecked, setChecked] = useState(false);
  const [textInputValue, setTextInputValue] = useState<string>("");

  const todoItemStyles: React.CSSProperties = {
    color: isDarkMode ? COLOURS.White : COLOURS.Black,
    backgroundColor: isDarkMode ? COLOURS.Black : COLOURS.White,
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextInputValue(event.target.value);
  };

  return (
    <div key={index} className="todo-item-container">
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
        style={todoItemStyles}
      />
    </div>
  );
};

export default TodoItem;
