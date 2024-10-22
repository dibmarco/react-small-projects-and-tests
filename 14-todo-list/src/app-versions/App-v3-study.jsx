import { useEffect, useRef, useState } from "react";

const initialTasks = [
  {
    taskName: "wash car",
    taskNotes: "",
    done: true,
  },
  {
    taskName: "buy fruits",
    taskNotes: "grapes, oranges, apples",
    done: false,
  },
];

const fullTaskLog = [
  {
    date: "November 2, 2024",
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
    date: "November 3, 2024",
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
  const [taskName, setTaskName] = useState("");
  const [taskNotes, setTaskNotes] = useState("");
  const [taskList, setTaskList] = useState(initialTasks);

  const [taskLog, setTaskLog] = useState(fullTaskLog);
  // console.log(taskLog);

  const [visibleNoteIndex, setVisibleNoteIndex] = useState(null); // Track notes visibility for each task

  const remainingTasks = taskList.filter((task) => !task.done).length;

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

  function toggleNotes(index) {
    setVisibleNoteIndex(visibleNoteIndex === index ? null : index); // Toggle notes visibility for each task
  }

  return (
    <div className="App">
      <InputField
        taskName={taskName}
        taskNotes={taskNotes}
        addTaskName={addTaskName}
        addTaskNote={addTaskNote}
        addTaskToList={addTaskToList}
        setVisibleNoteIndex={setVisibleNoteIndex}
      />
      <TaskLog taskLog={taskLog} />
      {/* <TaskList
        taskList={taskList}
        remainingTasks={remainingTasks}
        markComplete={markComplete}
        visibleNoteIndex={visibleNoteIndex}
        toggleNotes={toggleNotes}
      /> */}
    </div>
  );
}

function InputField({
  taskName,
  taskNotes,
  addTaskName,
  addTaskNote,
  addTaskToList,
  setVisibleNoteIndex,
}) {
  const [openForm, setOpenForm] = useState(false);
  const taskInputRef = useRef();

  // const date = new Date();
  // const options = { year: "numeric", month: "long", day: "numeric" };
  // const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  useEffect(() => {
    if (openForm) {
      taskInputRef.current?.focus();
    }
  }, [openForm]);

  return (
    <div className="input-field">
      <button
        onClick={() => {
          setOpenForm(true);
          setVisibleNoteIndex(null);
        }}
      >
        Create Task +
      </button>
      <br />
      {openForm && (
        <>
          <br />
          <input
            ref={taskInputRef}
            type="text"
            id="enter-task"
            name="enter-task"
            minlength="4"
            maxlength="40"
            size="22"
            placeholder="Enter your task"
            value={taskName}
            onChange={(e) => addTaskName(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            maxLength="200"
            size="22"
            placeholder="Optional: Add notes"
            value={taskNotes}
            onChange={(e) => addTaskNote(e.target.value)}
          />
          <br />
          <div className="add-cancel-btns">
            <button
              onClick={() => {
                addTaskToList(taskName, taskNotes);
                setOpenForm(false);
              }}
            >
              Add task
            </button>
            <p className="cancel-btn" onClick={() => setOpenForm(false)}>
              Cancel
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function TaskLog({ taskLog }) {
  return (
    <div>
      {taskLog.map((taskList) => (
        <>
        <div>{taskList.date}</div>
        <ul>{taskList.tasks.map((task) => <li>{task.taskName}</li>)}</ul>
        </>
      ))}
    </div>
  );
}

function TaskList({
  taskList,
  remainingTasks,
  markComplete,
  visibleNoteIndex,
  toggleNotes,
}) {
  return (
    <div className="task-list">
      <p>
        Tasks To Do{" "}
        {remainingTasks === 0 && taskList.length > 0
          ? "(All done!)"
          : remainingTasks > 0
          ? `(${remainingTasks} remaining)`
          : ""}
      </p>
      <ul>
        {taskList.map((task, i) => (
          <li key={i} className={task.done ? "done" : ""}>
            <div>{task.date}</div>
            <div onClick={() => markComplete(i)}>&#8618; {task.taskName}</div>
            {task.taskNotes && (
              <>
                <span
                  onClick={() => toggleNotes(i)}
                  // title={task.taskNotes}
                  title="View notes"
                  role="button"
                  // aria-label={task.taskNotes}
                  aria-label="View notes"
                >
                  🗒️
                </span>
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
