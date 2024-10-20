import { useState } from "react";

function App() {
  const [colorScheme, setColorScheme] = useState(1);

  function handleColorScheme() {
    colorScheme >= 3
      ? setColorScheme(1)
      : setColorScheme(() => colorScheme + 1);
  }

  return (
    <div className={`box color-${colorScheme}`}>
      <p>Click on the button to change the color scheme!</p>
      <button onClick={handleColorScheme}>OK</button>
    </div>
  );
}

export default App;
