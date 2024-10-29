import { useState } from "react";
import generateID from "./generateID";

const initialShirts = [
  {
    white: [
      { size: "small", qty: 3 },
      { size: "medium", qty: 4 },
      { size: "large", qty: 2 },
    ],
  },
  {
    grey: [
      { size: "medium", qty: 1 },
      { size: "large", qty: 2 },
    ],
  },
  {
    black: [
      { size: "small", qty: 3 },
      { size: "medium", qty: 0 },
    ],
  },
];

function App() {
  const [shirts, setShirts] = useState(initialShirts);
  const [color, setColor] = useState("");

  const colors = shirts.flatMap((shirt) => Object.keys(shirt));
  console.log(colors);

  return (
    <div className="App">
      <div>
        <label htmlFor="color">Color: </label>
        <select
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="">------</option>
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="size">Size: </label>
        <select id="size" disabled={!color}>
          <option value="">------</option>
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
