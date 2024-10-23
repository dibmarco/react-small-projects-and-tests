import { useState } from "react";

const initialTaskLog = [
  {
    date: "October 22, 2024",
    tasks: [
      {
        taskName: "wash car",
        taskNotes: "",
        done: true,
      },
      {
        taskName: "buy fruits",
        taskNotes: "grapes, oranges, apples",
        done: true,
      },
    ],
  },
  {
    date: "January 1, 2024",
    tasks: [
      {
        taskName: "dentist appointment",
        taskNotes: "",
        done: false,
      },
      {
        taskName: "fix fridge",
        taskNotes: "be careful",
        done: false,
      },
    ],
  },
];

function App() {
  // Sets present date
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  // Manages objects
  const [taskLog, setTaskLog] = useState(initialTaskLog);

  // InputField states
  const [openForm, setOpenForm] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [notes, setNotes] = useState("");

  function addTaskToList(newTask, notes) {
    if (newTask.trim() === "") {
      alert("Enter a task.");
    } else {
      // Make a copy of the task log
      const updatedTaskLog = [...taskLog];

      // Find the index for today's date in the task log
      const todayIndex = updatedTaskLog.findIndex(
        (log) => log.date === formattedDate
      );

      const newTaskObj = {
        taskName: newTask.toLowerCase(),
        taskNotes: notes.toLowerCase(),
        done: false,
      };

      if (todayIndex !== -1) {
        // Update tasks for today's entry by adding the new task to the task list
        updatedTaskLog[todayIndex].tasks = [
          newTaskObj,
          ...updatedTaskLog[todayIndex].tasks, // Keep existing tasks
        ];
      } else {
        // If today's date is not found, create a new entry for today
        updatedTaskLog.push({
          date: formattedDate,
          tasks: [newTaskObj],
        });
      }

      // Update the task log state
      setTaskLog(updatedTaskLog);
      setNewTask(""); // Clear the task input field
      setNotes(""); // Clear the notes input field
      setOpenForm(false); // Close the form
    }
  }

  return (
    <div className="App">
      <InputField
        openForm={openForm}
        setOpenForm={setOpenForm}
        newTask={newTask}
        setNewTask={setNewTask}
        notes={notes}
        setNotes={setNotes}
        addTaskToList={addTaskToList}
      />
      <TaskLog>
        <TaskList presentDate={formattedDate} taskLog={taskLog} />
      </TaskLog>
    </div>
  );
}

function InputField({
  openForm,
  setOpenForm,
  newTask,
  setNewTask,
  notes,
  setNotes,
  addTaskToList,
}) {
  return (
    <div>
      <button onClick={() => setOpenForm(!openForm)}>Create Task</button>
      {openForm && (
        <>
          <br />
          <br />
          <input
            type="text"
            id="enter-task"
            name="enter-task"
            minLength="4"
            maxLength="40"
            size="22"
            placeholder="Enter your task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="text"
            maxLength="200"
            size="22"
            placeholder="Optional: Add notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <br />
          <div className="add-cancel-btns">
            <button onClick={() => addTaskToList(newTask, notes)}>
              Add task
            </button>
            <p onClick={() => setOpenForm(false)}>Cancel</p>
          </div>
        </>
      )}
    </div>
  );
}

function TaskLog({ children }) {
  return (
    <>
      <div>Manage Your Day-to-Day Tasks:</div>
      <div>{children}</div>
    </>
  );
}

function TaskList({ presentDate, taskLog }) {
  return (
    <>
      {/* First, show today's task list if it exists */}
      {taskLog
        .filter((taskList) => taskList.date === presentDate)
        .map((taskList, i) => (
          <div key={i}>
            <p>{taskList.date}</p>
            <ul>
              {taskList.tasks.map((task, j) => (
                <TaskItem
                  key={j}
                  taskName={task.taskName}
                  taskNotes={task.taskNotes}
                />
              ))}
            </ul>
          </div>
        ))}

      {/* Then, show all expired task lists */}
      {taskLog
        .filter((taskList) => taskList.date !== presentDate)
        .map((taskList, i) => (
          <div key={i} className="expired">
            <p>{taskList.date}</p>
            <ul>
              {taskList.tasks.map((task, j) => (
                <TaskItem
                  key={j}
                  taskName={task.taskName}
                  taskNotes={task.taskNotes}
                />
              ))}
            </ul>
          </div>
        ))}
    </>
  );
}

function TaskItem({ taskName, taskNotes }) {
  return (
    <li>
      {taskName}
      {taskNotes && (
        <span title={taskNotes} aria-label={taskNotes}>
          🗒️
        </span>
      )}
    </li>
  );
}

export default App;
