import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);

  function addInput(input) {
    setInput(input);
  }

  function addTaskToList(task) {
    setTaskList((prevTasks) => [...prevTasks, task]);
    setInput("");
  }

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
        <p>Your tasks ({taskList.length})</p>
        {taskList.map((task, i) => <p key={i}>{task}</p>)}
      </div>
    </div>
  );
}

export default App;
