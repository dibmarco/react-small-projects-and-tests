import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);

  function addInput(input) {
    setInput(input);
  }

  function addTaskToList(task) {
    if (task.trim() === "") {
      alert("Enter a task.");
    } else {
      setTaskList((prevTasks) => [
        { text: task.toLowerCase(), done: false },
        ...prevTasks,
      ]);
      setInput("");
    }
  }

  function markComplete(index) {
    setTaskList((prevTasks) =>
      prevTasks.map(
        (task, i) => (i === index ? { ...task, done: !task.done } : task) // Toggle the done status of the clicked task
      )
    );
  }

  const remainingTasks = taskList.filter((task) => !task.done).length;

  return (
    <div className="App">
      <div className="input-field">
        <input
          type="text"
          id="enter-task"
          name="enter-task"
          minlength="4"
          maxlength="140"
          size="20"
          placeholder="Add a task"
          value={input}
          onChange={(e) => addInput(e.target.value)}
          required
        />
      </div>
      <button onClick={() => addTaskToList(input)}>OK</button>
      <br />
      <br />
      <div className="task-list">
        <p>Your tasks ({remainingTasks})</p>
        <ul>
          {taskList.map((task, i) => (
            <li
              key={i}
              onClick={() => markComplete(i)}
              className={task.done ? "done" : ""}
            >
              {task.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;