import React from "react";
import DayList from "./DayList";
import PropTypes from "prop-types";
import { ACCENT_COLOURS} from "./colours";



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
 console.log("This is happening")
  return (
    <div className="weekly-todo-list">
      {daysOfWeek.map((day) => (
        <DayList
          key={day}
          day={day}
          {...props}
        />
      ))}
    </div>
  );
};

WeeklyTodoList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  accentColour: PropTypes.oneOf(Object.values(ACCENT_COLOURS)).isRequired,
};

export default WeeklyTodoList;