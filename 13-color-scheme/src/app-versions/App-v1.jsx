import { useState } from "react";

function App() {
  const [toggleColors, setToggleColors] = useState(false);

  function handleToggleColors() {
    setToggleColors(!toggleColors);
  }

  return (
    <div className={`box ${toggleColors ? "color-2" : "color-1"}`}>
      <p>Click on the button to change colors!</p>
      <button onClick={handleToggleColors}>OK</button>
    </div>
  );
}

export default App;
