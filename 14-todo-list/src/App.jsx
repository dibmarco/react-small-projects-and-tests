import { useState, useRef, useEffect } from "react";

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
    date: "October 21, 2024",
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

  function markComplete(taskDateIndex, taskIndex) {
    // Create a copy of the task log
    const updatedTaskLog = [...taskLog];

    // Toggle the done status of the clicked task
    const task = updatedTaskLog[taskDateIndex].tasks[taskIndex];
    task.done = !task.done;

    // Update the task log state
    setTaskLog(updatedTaskLog);
  }

  function removeTask(taskDateIndex, taskIndex) {
    // Create a copy of the task log
    const updatedTaskLog = [...taskLog];

    // Remove the task at taskIndex
    updatedTaskLog[taskDateIndex].tasks.splice(taskIndex, 1);

    // If the task list for that date becomes empty, remove the date entry entirely
    if (updatedTaskLog[taskDateIndex].tasks.length === 0) {
      updatedTaskLog.splice(taskDateIndex, 1);
    }

    // Update the task log state
    setTaskLog(updatedTaskLog);
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
        <TaskList
          presentDate={formattedDate}
          taskLog={taskLog}
          markComplete={markComplete}
          removeTask={removeTask}
        />
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
  const taskInputRef = useRef();

  useEffect(() => {
    if (openForm) {
      taskInputRef.current?.focus(); // Focus the input when the form opens
    }
  }, [openForm]);

  return (
    <div>
      <button className="new-task-btn" onClick={() => setOpenForm(!openForm)}>
        Create Task
      </button>
      {openForm && (
        <div className="input-form">
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
            ref={taskInputRef} // Attach ref to the input field
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
            <button
              className="add-btn"
              onClick={() => addTaskToList(newTask, notes)}
            >
              Add task
            </button>
            <p className="cancel-btn" onClick={() => setOpenForm(false)}>
              Cancel
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskLog({ children }) {
  return (
    <>
      {/* <div className="tasklog">Manage Your Day-to-Day Tasks:</div> */}
      <p style={{ width: "75%", textAlign: "center" }}>-~-~-~-</p>
      <div>{children}</div>
    </>
  );
}

function TaskList({ presentDate, taskLog, markComplete, removeTask }) {
  return (
    <>
      {/* Show today's task list if it exists */}
      {taskLog
        .filter((taskList) => taskList.date === presentDate)
        .map((taskList, i) => (
          <div className="list-block" key={i}>
            <p className="task-date">{taskList.date}</p>
            <ul>
              {taskList.tasks.map((task, j) => (
                <TaskItem
                  key={j}
                  taskName={task.taskName}
                  taskNotes={task.taskNotes}
                  markComplete={() =>
                    markComplete(
                      taskLog.findIndex((log) => log.date === presentDate),
                      j
                    )
                  }
                  done={task.done}
                  isToday={true} // Pass that this task is from today
                  removeTask={() =>
                    removeTask(
                      taskLog.findIndex((log) => log.date === presentDate),
                      j
                    )
                  }
                />
              ))}
            </ul>
            {taskList.tasks.filter((task) => !task.done).length > 0 && (
              <p>
                You have{" "}
                <span className="unfinished-tasks">
                  {taskList.tasks.filter((task) => !task.done).length}{" "}
                  {taskList.tasks.filter((task) => !task.done).length === 1
                    ? "task"
                    : "tasks"}
                </span>{" "}
                left to complete today.
              </p>
            )}
            {taskList.tasks.filter((task) => !task.done).length === 0 && (
              <p>All tasks complete. Great job!</p>
            )}
          </div>
        ))}

      {/* Show all expired task lists without toggle functionality */}
      {taskLog
        .filter((taskList) => taskList.date !== presentDate)
        .map((taskList, i) => (
          <div className="expired list-block" key={i}>
            <p className="task-date">{taskList.date}</p>
            <ul>
              {taskList.tasks.map((task, j) => (
                <TaskItem
                  key={j}
                  taskName={task.taskName}
                  taskNotes={task.taskNotes}
                  done={task.done}
                  isToday={false} // Pass that this task is expired
                />
              ))}
            </ul>
            {taskList.tasks.filter((task) => !task.done).length > 0 && (
              <p>
                You left{" "}
                <span className="unfinished-tasks">
                  {taskList.tasks.filter((task) => !task.done).length} tasks
                </span>{" "}
                unfinished.
              </p>
            )}
            {taskList.tasks.filter((task) => !task.done).length === 0 && (
              <p>All tasks complete. Great job!</p>
            )}
          </div>
        ))}
    </>
  );
}

function TaskItem({
  taskName,
  taskNotes,
  markComplete,
  done,
  isToday,
  removeTask,
}) {
  return (
    <li
      onClick={isToday ? markComplete : null} // Make it clickable only if it's today's task
      className={`${done ? "done" : ""} ${isToday ? "not-expired" : ""}`} // Add 'not-expired' class for today
    >
      &#8618; {taskName}
      {taskNotes && (
        <span title={taskNotes} aria-label={taskNotes}>
          🗒️
        </span>
      )}
      {isToday && !done && (
        <div
          className="remove-task"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the parent onClick from firing
            removeTask(); // Remove task when trash icon is clicked
          }}
        >
          🗑️
        </div>
      )}
    </li>
  );
}

export default App;
