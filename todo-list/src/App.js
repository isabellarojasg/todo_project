import TodoItem from "./TodoItem";
import "./styles.css";

function App() {
  const numTodoItems = 10;

  return (
    <div>
      <h1 className="font-style">TODO LIST</h1>
      {Array.from({ length: numTodoItems }, (_, index) => (
        <TodoItem index={index} />
      ))}
    </div>
  );
}

export default App;
