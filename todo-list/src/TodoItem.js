import React, { useState } from "react";
import PropTypes from "prop-types";
import { ACCENT_COLOURS, COLOURS } from "./colours";

function TodoItem(props) {
  const {
    index,
    day,
    value,
    checked,
    isDarkMode,
    accentColour,
    handleKeyDown,
    handleCheckboxChange,
    handleTextInputChange,
    handleDelete,
    prevTodoItem,
  } = props;

  const [showDelete, setShowDelete] = useState(false);
  const [hoveredDeleteIcon, setHoveredDeleteIcon] = useState(null);

  const todoItemStyles = {
    color: isDarkMode ? COLOURS.White : COLOURS.Black,
    backgroundColor: isDarkMode ? COLOURS.Black : COLOURS.White,
  };

  const checkBoxStyles = {
    accentColor: accentColour,
  };

  return (
    <div
      className="todo-item-container"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      style={{ position: "relative", marginRight: "20px" }}
    >
      <input
        id={`todo-input-${day}-${index}`}
        className={`todo-item font-style ${
          checked ? "completed-todo-item" : ""
        }`}
        type="text"
        value={value}
        onChange={(event) => handleTextInputChange(event, index)}
        onKeyDown={(event) => handleKeyDown(event, index)}
        style={{
          ...todoItemStyles,
          paddingRight: "25px", // Space for the trash icon
          pointerEvents: index !== 0 && !prevTodoItem ? "none" : "auto",
        }}
      />
      {value && (
        <input
          className="checkbox"
          type="checkbox"
          checked={checked}
          onChange={() => handleCheckboxChange(index)}
          style={checkBoxStyles}
        />
      )}
      {showDelete && value && (
        <i
          style={{
            color: accentColour,
            opacity: hoveredDeleteIcon === index ? 0.7 : 1,
            position: "absolute",
            right: "5px", // Adjust the position as needed
            top: "50%",
            transform: "translateY(-50%)",
          }}
          className="fa-solid fa-trash"
          onClick={() => handleDelete(index)}
          onMouseEnter={() => setHoveredDeleteIcon(index)}
          onMouseLeave={() => setHoveredDeleteIcon(null)}
        ></i>
      )}
    </div>
  );
}

TodoItem.propTypes = {
  index: PropTypes.number.isRequired,
  day: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  accentColour: PropTypes.oneOf(Object.values(ACCENT_COLOURS)).isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleTextInputChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  prevTodoItem: PropTypes.string,
};

export default TodoItem;
