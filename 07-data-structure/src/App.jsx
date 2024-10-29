import { useState } from "react";
import generateID from "./generateID";

const initialShirts = {
  white: { small: 3, medium: 4, large: 2 },
  grey: { medium: 1, large: 2 },
  black: { small: 3, medium: 0 },
};

function App() {
  const [shirts, setShirts] = useState(initialShirts);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQty, setSelectedQty] = useState("");
  
  const colors = [...Object.keys(shirts)];
  console.log(colors);

  function availableSizes() {
    let sizes = [];
    if (selectedColor) {
      sizes = [...Object.keys(shirts[selectedColor])];
    }
    return sizes;
  }

  function availableQty() {
    let qty = [];
    if (selectedColor && selectedSize) {
      const quantity = shirts[selectedColor][selectedSize];
      qty = Array.from({ length: quantity }, (_, i) => i + 1);
    }
    return qty;
  }

  return (
    <div className="App">
      <div className="colors">
        <label htmlFor="shirt-colors">Color: </label>
        <select id="colors" onChange={(e) => setSelectedColor(e.target.value)}>
          <option value="">----</option>
          {colors.map((color) => (
            <option value={color} key={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div className="sizes">
        <label htmlFor="shirt-sizes">Size: </label>
        <select
          disabled={!selectedColor}
          id="sizes"
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">----</option>
          {availableSizes().map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div className="qty">
        <label htmlFor="shirt-qty">Quantity: </label>
        <select
          disabled={!selectedSize}
          id="qty"
          onChange={(e) => setSelectedQty(e.target.value)}
        >
          <option value="">----</option>
          {availableQty().map((qty) => (
            <option key={qty} value={qty}>
              {qty}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
