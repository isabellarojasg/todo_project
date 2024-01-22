import React, { useState, ChangeEvent, useEffect } from "react";
import "./styles.css";
import { COLOURS } from "./colours";

interface TodoItemProps {
  index: number;
  isDarkMode: boolean;
  accentColour: string;
  onDelete: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { index, isDarkMode, accentColour, onDelete } = props;
  const storedTodoJSON = localStorage.getItem(`${index}`);
  const [isChecked, setChecked] = useState(() => {
    return storedTodoJSON ? JSON.parse(storedTodoJSON).completed : false;
  });
  const [textInputValue, setTextInputValue] = useState(() => {
    return storedTodoJSON ? JSON.parse(storedTodoJSON).text : "";
  });
  const [showDelete, setShowDelete] = useState(false);

  const todoItemStyles: React.CSSProperties = {
    color: isDarkMode ? COLOURS.White : COLOURS.Black,
    backgroundColor: isDarkMode ? COLOURS.Black : COLOURS.White,
  };

  const checkBoxStyles: React.CSSProperties = {
    accentColor: accentColour,
  };

  useEffect(() => {
    if (textInputValue === "") {
      setChecked(false);
    }
  }, [textInputValue]);

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

  const handleDelete = () => {
    setTextInputValue("");
    setChecked(false);
    onDelete(index);
    localStorage.removeItem(`${index}`);
  };

  return (
    <div
      key={index}
      className="todo-item-container"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
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
      {showDelete && textInputValue && (
        <i
          style={{ color: accentColour }}
          className="fa-solid fa-trash"
          onClick={handleDelete}
        ></i>
      )}
    </div>
  );
};

export default TodoItem;
