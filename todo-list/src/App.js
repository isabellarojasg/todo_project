import { useState } from "react";
import TodoItem from "./TodoItem";
import "./styles.css";
import { COLOURS } from "./colours";

function App() {
  const numTodoItems = 10;
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  const bodyStyles = {
    backgroundColor: isDarkMode ? COLOURS.Black : COLOURS.White,
  };

  document.body.style.backgroundColor = bodyStyles.backgroundColor;

  return (
    <div>
      <i
        class={`fa-regular hover-style ${
          isDarkMode ? "fa-solid fa-sun white-sun" : "fa-moon black-moon"
        }`}
        onClick={toggleDarkMode}
      ></i>
      <h1
        className="font-style"
        style={{ color: isDarkMode ? COLOURS.White : COLOURS.Black }}
      >
        TODO LIST
      </h1>
      {Array.from({ length: numTodoItems }, (_, index) => (
        <TodoItem index={index} isDarkMode={isDarkMode} />
      ))}
    </div>
  );
}

export default App;
