import React, { useState } from "react";
import PropTypes from "prop-types";
import { ACCENT_COLOURS, COLOURS } from "./colours";

const DayList = (props) => {
  const numTodoItems = 10;
  const { day, isDarkMode, accentColour } = props;
  const [isChecked, setChecked] = useState(
    Array.from({ length: numTodoItems }).fill(false)
  );
  const [textInputValues, setTextInputValues] = useState(
    Array.from({ length: numTodoItems }).fill("")
  );

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

  const handleTextInputChange = (event, index) => {
    const { value } = event.target;
    setTextInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" && textInputValues[index]) {
      const nextIndex = index + 1;
      if (nextIndex < numTodoItems) {
        document.getElementById(`todo-input-${day}-${nextIndex}`).focus();
      }
    }
    if (event.key === "Backspace" && textInputValues[index] == "") {
      const nextIndex = index === 0 ? 0 : index - 1;
      event.preventDefault();
      document.getElementById(`todo-input-${day}-${nextIndex}`).focus();
    }
  };

  return (
    <div className="day-todo-list">
      <h1 className="font-style">{day}</h1>
      <div className="todo-list-container">
        {Array.from({ length: numTodoItems }, (_, index) => (
          <div key={index} className="todo-item-container">
            <input
              id={`todo-input-${day}-${index}`}
              className={`todo-item font-style ${
                isChecked[index] ? "completed-todo-item" : ""
              }`}
              type="text"
              value={textInputValues[index]}
              onChange={(event) => handleTextInputChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              style={{
                ...todoItemStyles,
                pointerEvents:
                  index != 0 && !textInputValues[index - 1] ? "none" : "auto",
              }}
            />
            {textInputValues[index] && (
              <input
                className="checkbox"
                type="checkbox"
                checked={isChecked[index]}
                onChange={() => handleCheckboxChange(index)}
                style={checkBoxStyles}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

DayList.propTypes = {
  day: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  accentColour: PropTypes.oneOf(Object.values(ACCENT_COLOURS)).isRequired,
};

export default DayList;
