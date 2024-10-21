import { useState } from "react";

function App() {
  const [taskName, setTaskName] = useState("");
  const [taskNotes, setTaskNotes] = useState("");
  const [taskList, setTaskList] = useState([]);

  function addTaskName(taskName) {
    setTaskName(taskName);
  }

  function addTaskNote(taskNotes) {
    setTaskNotes(taskNotes);
  }

  function addTaskToList(taskName, taskNotes) {
    if (taskName.trim() === "") {
      alert("Enter a task.");
    } else {
      setTaskList((prevTasks) => [
        {
          taskName: taskName.toLowerCase(),
          taskNotes: taskNotes.toLowerCase(),
          done: false,
        },
        ...prevTasks,
      ]);
      setTaskName("");
      setTaskNotes("");
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
      <InputField
        taskName={taskName}
        taskNotes={taskNotes}
        addTaskName={addTaskName}
        addTaskNote={addTaskNote}
        addTaskToList={addTaskToList}
      />
      <TaskList
        remainingTasks={remainingTasks}
        taskList={taskList}
        markComplete={markComplete}
      />
    </div>
  );
}

function InputField({
  taskName,
  taskNotes,
  addTaskName,
  addTaskNote,
  addTaskToList,
}) {
  return (
    <div className="input-field">
      <input
        type="text"
        id="enter-task"
        name="enter-task"
        minlength="4"
        maxlength="40"
        size="20"
        placeholder="Add a task"
        value={taskName}
        onChange={(e) => addTaskName(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        maxLength="200"
        size="20"
        placeholder="Add notes"
        value={taskNotes}
        onChange={(e) => addTaskNote(e.target.value)}
      />
      <br />
      <button onClick={() => addTaskToList(taskName, taskNotes)}>OK</button>
    </div>
  );
}

function TaskList({ remainingTasks, taskList, markComplete }) {
  const [visibleNoteIndex, setVisibleNoteIndex] = useState(null); // Track notes visibility for each task

  function toggleNotes(index) {
    setVisibleNoteIndex(visibleNoteIndex === index ? null : index); // Toggle notes visibility for each task
  }

  return (
    <div className="task-list">
      <p>Your tasks ({remainingTasks})</p>
      <ul>
        {taskList.map((task, i) => (
          <li key={i} className={task.done ? "done" : ""}>
            <div onClick={() => markComplete(i)}>&#8618; {task.taskName}</div>
            {task.taskNotes && (
              <>
                <div onClick={() => toggleNotes(i)}>🗒️</div>
                {visibleNoteIndex === i && <div>{task.taskNotes}</div>}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
