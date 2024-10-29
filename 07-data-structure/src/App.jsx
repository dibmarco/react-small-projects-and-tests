import { useState } from "react";
import generateID from "./generateID";

const initialShirts = {
  white: { small: 3, medium: 4, large: 2 },
  grey: { medium: 1, large: 2 },
  black: { small: 3, medium: 0 },
};


function App() {
  const [shirts, setShirts] = useState(initialShirts);

  const colors = shirts.flatMap((shirt) => Object.keys(shirt));

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
