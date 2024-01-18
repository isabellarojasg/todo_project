import React from "react";
import DayList from "./DayList";

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

  return (
    <div className="weekly-todo-list">
      {daysOfWeek.map((day) => (
        <DayList
          day={day}
          {...props}
        />
      ))}
    </div>
  );
};

export default WeeklyTodoList;