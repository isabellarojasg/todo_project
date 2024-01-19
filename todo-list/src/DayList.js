import React, { useState } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import { ACCENT_COLOURS, COLOURS } from "./colours";

const DayList = (props) => {
  const numTodoItems = 10;
  const { day, isDarkMode, accentColour } = props;
  const [isChecked, setChecked] = useState(
    Array.from({ length: numTodoItems }).fill(false)
  );
  const [textInputValue, setTextInputValue] = useState([""]);

  const todoItemStyles = {
    color: isDarkMode ? COLOURS.White : COLOURS.Black,
    backgroundColor: isDarkMode ? COLOURS.Black : COLOURS.White,
  };

  const checkBoxStyles = {
    accentColor: accentColour,
  };

  const handleCheckboxChange = (index) => {
    const newCheckedState = [...isChecked];
    newCheckedState[index] = !newCheckedState[index];
    setChecked(newCheckedState);
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

DayList.propTypes = {
  day: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  accentColour: PropTypes.oneOf(Object.keys(ACCENT_COLOURS)).isRequired,
};
export default DayList;
