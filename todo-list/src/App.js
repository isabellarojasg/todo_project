import * as React from 'react';
import WeeklyTodoList from "./WeeklyTodoList"
import "./styles.css";
import { ACCENT_COLOURS, COLOURS } from "./colours";

function App() {
  const [isDarkMode, setDarkMode] = React.useState(false);
  const [accentColour, setAccentColour] = React.useState(ACCENT_COLOURS.Blue);
  const [selectedDroplet, setSelectedDroplet] = React.useState(0);

  const handleColourSelect = (index, hexColour) => {
    setAccentColour(hexColour);
    setSelectedDroplet(index);
  };

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
        <div className="todo-list-container">
            <WeeklyTodoList
              isDarkMode={isDarkMode}
              accentColour={accentColour}
            />
        </div>
      </div>
  );
}

export default App;
