import { useState } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      className="container"
      style={{ backgroundColor: openModal ? "#000" : "#fff" }}
    >
      <button onClick={() => setOpenModal(!openModal)}>Open modal</button>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

function Modal({ openModal, setOpenModal }) {
  return (
    <div className={`modal ${openModal ? "" : "hidden"}`}>
      <h2>Modal Window</h2>
      <button onClick={() => setOpenModal(!openModal)}>Close</button>
    </div>
  );
}

export default App;
