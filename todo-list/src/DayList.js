import React, { useState } from "react";
import PropTypes from "prop-types";
import { ACCENT_COLOURS } from "./colours";
import TodoItem from "./TodoItem";

const DayList = (props) => {
  const numTodoItems = 10;
  const { day, isDarkMode, accentColour } = props;
  const storedCheckedList = localStorage.getItem(`${day}-CheckedList`);
  const [isChecked, setChecked] = useState(() => {
    return storedCheckedList
      ? storedCheckedList.split(",").map((value) => JSON.parse(value))
      : Array.from({ length: numTodoItems }).fill(false);
  });

  const storedTextList = localStorage.getItem(`${day}-TextList`);
  const [textInputValues, setTextInputValues] = useState(() => {
    return storedTextList
      ? storedTextList.split(",")
      : Array.from({ length: numTodoItems }).fill("");
  });

  const handleCheckboxChange = (index) => {
    const newCheckedState = [...isChecked];
    newCheckedState[index] = !newCheckedState[index];
    localStorage.setItem(`${day}-CheckedList`, newCheckedState);
    setChecked(newCheckedState);
  };

  const handleTextInputChange = (event, index) => {
    const { value } = event.target;
    setTextInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      localStorage.setItem(`${day}-TextList`, updatedValues);
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
    if (event.key === "Backspace" && textInputValues[index] === "") {
      const nextIndex = index === 0 ? 0 : index - 1;
      event.preventDefault();
      document.getElementById(`todo-input-${day}-${nextIndex}`).focus();
    }
  };

  const handleDelete = (index) => {
    setTextInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues.splice(index, 1);
      updatedValues.push("");
      localStorage.setItem(`${day}-TextList`, updatedValues);
      return updatedValues;
    });

    const newCheckedState = [...isChecked];
    newCheckedState.shift();
    newCheckedState.push(false);
    localStorage.setItem(`${day}-CheckedList`, newCheckedState);
    setChecked(newCheckedState);
  };

  return (
    <div className="day-todo-list">
      <h2 className="font-style">{day}</h2>
      <div className="todo-list-container">
        {Array.from({ length: numTodoItems }, (_, index) => (
          <TodoItem
            key={index}
            index={index}
            day={day}
            value={textInputValues[index]}
            checked={isChecked[index]}
            isDarkMode={isDarkMode}
            accentColour={accentColour}
            handleKeyDown={handleKeyDown}
            handleTextInputChange={handleTextInputChange}
            handleCheckboxChange={handleCheckboxChange}
            handleDelete={handleDelete}
            prevTodoItem={textInputValues[index - 1]}
          />
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
