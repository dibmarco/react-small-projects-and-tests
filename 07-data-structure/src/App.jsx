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
  const [colorIndex, setColorIndex] = useState(-1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const colors = shirts.flatMap((shirt) => Object.keys(shirt));
  console.log(colors);
  console.log(shirts[0]["white"]);

  const getQtyOptions = () => {
    if (color && size && colorIndex !== -1) {
      const selectedShirt = shirts[colorIndex][color].find(
        (shirt) => shirt.size === size
      );
      if (selectedShirt) {
        return Array.from({ length: selectedShirt.qty }, (_, k) => k + 1);
      }
    }
    return [];
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="color">Color: </label>
        <select
          id="color"
          value={color}
          onChange={(e) => {
            const selectedColor = e.target.value;
            setColor(selectedColor);
            const cIndex = colors.findIndex((c) => c === selectedColor);
            setColorIndex(cIndex);
            setSize(""); // Reset size when color changes
          }}
        >
          <option value="">------</option>
          {colors.map((color, i) => (
            <option key={i} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label htmlFor="size">Size: </label>
        <select
          id="size"
          value={size}
          disabled={!color}
          onChange={(e) => {
            const selectedSize = e.target.value;
            setSize(selectedSize);
          }}
        >
          <option value="">------</option>
          {color &&
            colorIndex !== -1 &&
            shirts[colorIndex][color].map((sizeObj, j) => (
              <option key={j} value={sizeObj.size}>
                {sizeObj.size}
              </option>
            ))}
        </select>
      </div>
      <br />
      <div>
        <label htmlFor="qty">Quantity: </label>
        <select id="qty" disabled={!size}>
          <option value="">------</option>
          {getQtyOptions().map((qty, k) => (
            <option key={k} value={qty}>
              {qty}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
