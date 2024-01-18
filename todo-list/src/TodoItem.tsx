import React, { useState, ChangeEvent } from "react";
import "./styles.css";
import { COLOURS } from "./colours";

interface TodoItemProps {
  index: number;
  isDarkMode: boolean;
  accentColour: string;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { index, isDarkMode, accentColour } = props;
  const storedTodoJSON = localStorage.getItem(`${index}`);
  const [isChecked, setChecked] = useState(() => {
    return storedTodoJSON ? JSON.parse(storedTodoJSON).completed : false;
  });
  const [textInputValue, setTextInputValue] = useState(() => {
    return storedTodoJSON ? JSON.parse(storedTodoJSON).text : "";
  });

  const todoItemStyles: React.CSSProperties = {
    color: isDarkMode ? COLOURS.White : COLOURS.Black,
    backgroundColor: isDarkMode ? COLOURS.Black : COLOURS.White,
  };

  const checkBoxStyles: React.CSSProperties = {
    accentColor: accentColour,
  };

  const handleCheckboxChange = () => {
    setChecked((isChecked: boolean) => {
      const newChecked = !isChecked;
      localStorage.setItem(
        `${index}`,
        JSON.stringify({ text: textInputValue, completed: newChecked })
      );
      return newChecked;
    });
  };

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setTextInputValue(newValue);
    localStorage.setItem(
      `${index}`,
      JSON.stringify({ text: newValue, completed: isChecked })
    );
  };

  return (
    <div key={index} className="todo-item-container">
      {textInputValue && (
        <input
          className="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={checkBoxStyles}
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
