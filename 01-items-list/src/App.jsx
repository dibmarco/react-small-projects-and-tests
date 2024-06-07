import React, { useState } from "react";

const mugs = [
  {
    color: "White",
    img: "imgs/white_mug.jpg",
    price: 12.49,
  },
  {
    color: "Brown",
    img: "imgs/brown_mug.jpg",
    price: 12.49,
  },
  {
    color: "Black",
    img: "imgs/black_mug.jpg",
    price: 12.49,
  },
];

function App() {
  return (
    <div className="app">
      <Selections />
      <ShoppingList />
    </div>
  );
}

function Selections() {
  const [selectedColor, setSelectedColor] = useState(mugs[0].color);

  function handleColorSelection(event) {
    setSelectedColor(event.target.value);
  };

  const selectedMug = mugs.find((mug) => mug.color === selectedColor);
  // console.log(selectedMug);

  return (
    <div className="selections">
      <div>
        <p>Select your Coffee Mug</p>
        <img
          src={selectedMug.img}
          alt={`${selectedColor} Coffee Mug`}
          className="mug-selection"
        />
      </div>

      <label>Color</label>
      <select value={selectedColor} onChange={handleColorSelection}>
        {mugs.map((mug, i) => (
          <option value={mug.color} key={i}>
            {mug.color}
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
