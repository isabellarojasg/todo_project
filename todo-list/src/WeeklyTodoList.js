import React from "react";
import DayList from "./DayList";
import PropTypes from "prop-types";
import { ACCENT_COLOURS, COLOURS } from "./colours";

const WeeklyTodoList = (props) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const todoItemStyles = {
    color: props.isDarkMode ? COLOURS.White : COLOURS.Black,
    backgroundColor: props.isDarkMode ? COLOURS.Black : COLOURS.White,
  };

  return (
    <div className="weekly-todo-list" style={todoItemStyles}>
      {daysOfWeek.map((day) => (
        <DayList key={day} day={day} {...props} />
      ))}
    </div>
  );
};

WeeklyTodoList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  accentColour: PropTypes.oneOf(Object.values(ACCENT_COLOURS)).isRequired,
};

export default WeeklyTodoList;
