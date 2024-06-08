import React, { useState } from "react";

const mugs = {
  white: {
    img: "imgs/white_mug.jpg",
    price: 12.49,
  },
  brown: {
    img: "imgs/brown_mug.jpg",
    price: 13.49,
  },
  black: {
    img: "imgs/black_mug.jpg",
    price: 15.49,
  },
};

function App() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(mug) {
    setCart((prevCart) => [...prevCart, mug]);
  }

  function handleDeleteItem(id) {
    // console.log(id);
    setCart((mugs) => mugs.filter((mug) => mug.id !== id));
  }

  return (
    <div className="app">
      <Selections onAddtoCart={handleAddToCart} />
      <ShoppingList cart={cart} onDeleteItem={handleDeleteItem} />
    </div>
  );
}

function Selections({ onAddtoCart }) {
  const [selectedColor, setSelectedColor] = useState("white");
  const [img, setImg] = useState(mugs["white"].img);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(mugs["white"].price);

  function handleColorChange(color) {
    setSelectedColor(color);
    setImg(mugs[color].img);
    setQuantity(1);
    setPrice(mugs[color].price);
  }

  const selectedMug = mugs[selectedColor];

  function handleQuantity(value) {
    setQuantity(value);
  }

  function handleAddToCart() {
    const id = crypto.randomUUID();

    const mugSelections = {
      color: selectedColor,
      img: img,
      quantity: quantity,
      price: quantity * price,
      id: id,
    };

    // console.log(mugSelections);

    onAddtoCart(mugSelections);
  }

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
      <select
        value={selectedColor}
        onChange={(e) => handleColorChange(e.target.value)}
      >
        {/* Object.keys() creates an array containing the keys of a given object */}
        {Object.keys(mugs).map((color, i) => (
          <option value={color} key={i}>
            {color}
          </option>
        ))}
      </select>

      <br />

      <label>Quantity</label>
      <select
        value={quantity}
        onChange={(e) => handleQuantity(Number(e.target.value))}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <br />

      <button onClick={() => handleAddToCart()}>Add to Cart</button>
    </div>
  );
}

function ShoppingList({ cart, onDeleteItem }) {
  return (
    <div className="shopping-list">
      {cart.map((mugInCart, i) => (
        <div className="mug-in-cart" key={i}>
          <img src={mugInCart.img} alt={`${mugInCart.color} coffee mug`} />
          <p>Qty: {mugInCart.quantity}</p>
          <p>Price: {mugInCart.price}</p>
          <p className="delete-item" onClick={() => onDeleteItem(mugInCart.id)}>
            ❌
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
