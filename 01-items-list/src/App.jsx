import React, { useState } from "react";

const mugs = {
  white: {
    img: "imgs/white_mug.jpg",
    price: 12.49,
  },
  brown: {
    img: "imgs/brown_mug.jpg",
    price: 12.49,
  },
  black: {
    img: "imgs/black_mug.jpg",
    price: 12.49,
  },
};

function App() {
  return (
    <div className="app">
      <Selections />
      <ShoppingList />
    </div>
  );
}

function Selections() {
  const [selectedColor, setSelectedColor] = useState('white');

  function handleColorChange(event) {
    setSelectedColor(event.target.value);
  };

  const selectedMug = mugs[selectedColor];

  return (
    <div className="selections">
      <div>
        <p>Select your Coffee Mug</p>
        <img
          src={selectedMug.img}
          alt={`${selectedColor} coffee mug`}
          className="mug-selection"
        />
      </div>

      <label>Color</label>
      <select value={selectedColor} onChange={handleColorChange}>
        {/* Object.keys() creates an array containing the keys of a given object */}
        {Object.keys(mugs).map((color, i) => (
          <option value={color} key={i}>
            {color}
          </option>
        ))}
      </select>

      <br />

      <label>Quantity</label>
      <input type="number" min="1" />

      <br />

      <button>Add to Cart</button>
    </div>
  );
}

function ShoppingList() {
  return <div className="shopping-list"></div>;
}

export default App;
