import React from "react";
import DayList from "./DayList";
import PropTypes from "prop-types";
import { ACCENT_COLOURS, COLOURS } from "./colours";

const WeeklyTodoList = (props) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();

  // Get the current day of the week as a number (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const currentDayNumber = currentDate.getDay();

  // Determine the index of the starting day
  const startingDayIndex = daysOfWeek.indexOf(currentDayNumber);
  const [currentWeekStartingDay, setCurrentWeekStartingDay] =
    React.useState(currentDayNumber);

  const todoItemStyles = {
    color: props.isDarkMode ? COLOURS.White : COLOURS.Black,
    backgroundColor: props.isDarkMode ? COLOURS.Black : COLOURS.White,
  };

  const goToPreviousWeek = () => {
    const previousWeekStartingDayIndex =
      (startingDayIndex - 1 + daysOfWeek.length) % daysOfWeek.length;
    setCurrentWeekStartingDay(daysOfWeek[previousWeekStartingDayIndex]);
  };

  const goToNextWeek = () => {
    const nextWeekStartingDayIndex = (startingDayIndex + 1) % daysOfWeek.length;
    setCurrentWeekStartingDay(daysOfWeek[nextWeekStartingDayIndex]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <i className="fa-solid fa-arrow-left" onClick={goToPreviousWeek}></i>
      <div className="weekly-todo-list" style={todoItemStyles}>
        {daysOfWeek.map((day) => (
          <DayList key={day} day={day} {...props} />
        ))}
      </div>
        <i className="fa-solid fa-arrow-right" onClick={goToNextWeek}></i>
    </div>
  );
};

WeeklyTodoList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  accentColour: PropTypes.oneOf(Object.values(ACCENT_COLOURS)).isRequired,
};

export default WeeklyTodoList;