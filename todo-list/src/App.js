import { useState } from "react";
import TodoItem from "./TodoItem";
import "./styles.css";
import { ACCENT_COLOURS, COLOURS } from "./colours";

function App() {
  const numTodoItems = 10;
  const storedDarkModeJSON = localStorage.getItem("isDarkMode");
  const [isDarkMode, setDarkMode] = useState(() => {
    return storedDarkModeJSON ? JSON.parse(storedDarkModeJSON) : false;
  });
  const storedAccentColourJSON = localStorage.getItem("accentColour");
  const [accentColour, setAccentColour] = useState(ACCENT_COLOURS.Blue);
  // const [accentColour, setAccentColour] = useState(() => {
  //   return storedAccentColourJSON
  //     ? JSON.parse(storedAccentColourJSON)
  //     : ACCENT_COLOURS.Blue;
  // });
  const [selectedDroplet, setSelectedDroplet] = useState(0);
  const [todoItems, setTodoItems] = useState(
    Array.from({ length: numTodoItems }, (_, index) => index)
  );

  const handleColourSelect = (index, hexColour) => {
    setAccentColour(hexColour);
    //localStorage.setItem("accentColour", JSON.stringify(hexColour));
    setSelectedDroplet(index);
  };

  const handleOnDelete = (index) => {
    setTodoItems((prevItems) => {
      const newItems = prevItems.filter((item) => item !== index);
      //if (newItems.length < numTodoItems) return [...newItems, ""];
      return newItems;
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((isDarkMode) => {
      const newIsDarkMode = !isDarkMode;
      localStorage.setItem("isDarkMode", newIsDarkMode);
      return newIsDarkMode;
    });
  };

  const bodyStyles = {
    backgroundColor: isDarkMode ? COLOURS.Black : COLOURS.White,
  };

  document.body.style.backgroundColor = bodyStyles.backgroundColor;

  return (
    <div>
      <i
        className={`fa-regular hover-style ${
          isDarkMode ? "fa-solid fa-sun white-sun" : "fa-moon black-moon"
        }`}
        onClick={toggleDarkMode}
        style={{ marginBottom: "20px" }}
      ></i>
      <div style={{ display: "flex", gap: "10px" }}>
        {Object.keys(ACCENT_COLOURS).map((colour, index) => (
          <i
            key={index}
            className={`fa-solid fa-droplet ${
              selectedDroplet === index ? "fa-lg" : ""
            }`}
            onClick={() => handleColourSelect(index, ACCENT_COLOURS[colour])}
            style={{
              color: ACCENT_COLOURS[colour],
              transform: selectedDroplet === index ? "translateY(50%)" : "",
            }}
          ></i>
        ))}
      </div>
      <h1
        className="font-style"
        style={{ color: isDarkMode ? COLOURS.White : COLOURS.Black }}
      >
        TO-DO LIST
      </h1>
      {todoItems.map((index) => (
        <TodoItem
          key={index}
          index={index}
          isDarkMode={isDarkMode}
          accentColour={accentColour}
          onDelete={handleOnDelete}
        />
      ))}
    </div>
  );
}

export default App;
