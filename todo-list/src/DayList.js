import React, { useState } from "react";
import "./styles.css";
import { COLOURS } from "./colours";

const CombinedComponent = (props) => {
  const numTodoItems = 10;
  const { day, isDarkMode, accentColour } = props;
  const [isChecked, setChecked] = useState(false);
  const [textInputValue, setTextInputValue] = useState(['']);

  const todoItemStyles = {
    color: isDarkMode ? COLOURS.White : COLOURS.Black,
    backgroundColor: isDarkMode ? COLOURS.Black : COLOURS.White,
  };

  const checkBoxStyles = {
    accentColor: accentColour,
  };

  const handleCheckboxChange = (index) => {
    setChecked(!isChecked);
  };

  const handleTextInputChange = (event) => {
    setTextInputValue(event.target.value);
  };

  return (
    <div className="day-todo-list">
      <h1 className="font-style">{day}</h1>
      <div className="todo-list-container">
        {Array.from({ length: numTodoItems }, (_, index) => (
          <div key={index} className="todo-item-container">
            {textInputValue[index] && (
              <input
                className="checkbox"
                type="checkbox"
                checked={isChecked[index]}
                onChange={() => handleCheckboxChange(index)}
                style={checkBoxStyles}
              />
            )}
            <input
              className={`todo-item font-style ${
                isChecked ? "completed-todo-item" : ""
              }`}
              type="text"
              value={textInputValue[index]}
              onChange={(event) => handleTextInputChange(event)}
              style={todoItemStyles}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CombinedComponent;
