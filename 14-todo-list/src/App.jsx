import { useEffect, useRef, useState } from "react";

const initialTaskLog = [
  {
    date: "October 23, 2024",
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
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);


  const [taskLog, setTaskLog] = useState(initialTaskLog);
  const [todayTaskList, setTodayTaskList] = useState(() =>
    taskLog.find((today) => today.date === formattedDate)
  );

  return (
    <div className="App">
      <InputField />
      <TaskLog>
        <TaskList presentDate={formattedDate} taskLog={taskLog} />
      </TaskLog>
    </div>
  );
}

function InputField() {
  const [openForm, setOpenForm] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [notes, setNotes] = useState("");

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
            <button>Add task</button>
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
      <div>Your tasks day by day:</div>
      <div>{children}</div>
    </>
  );
}

function TaskList({ presentDate, taskLog }) {
  return (
    <>
      {taskLog.map((taskList, i) => (
        <div key={i} className={presentDate === taskList.date ? "" : "expired"}>
          <p>{taskList.date}</p>
          <ul>
            {taskList.tasks.map((task) => (
              <li>{task.taskName}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default App;
