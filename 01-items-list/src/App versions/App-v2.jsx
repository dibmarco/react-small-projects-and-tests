import React, { useState, useEffect } from "react";

const initialMugs = {
  white: {
    img: "imgs/white_mug.jpg",
    qty: 3,
    price: 12.49,
  },
  brown: {
    img: "imgs/brown_mug.jpg",
    qty: 4,
    price: 13.49,
  },
  black: {
    img: "imgs/black_mug.jpg",
    qty: 2,
    price: 15.49,
  },
};

function App() {
  const [mugs, setMugs] = useState(initialMugs);
  const [cart, setCart] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const qtyArray = cart.map((mug) => mug.quantity);
    const newTotalQty = qtyArray.reduce((acc, cur) => acc + cur, 0);
    setTotalQty(newTotalQty);

    const priceArray = cart.map((mug) => mug.price);
    const newTotalPrice = priceArray.reduce((acc, cur) => acc + cur, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  function handleAddToCart(mug) {
    setCart((prevCart) => [...prevCart, mug]);

    // Update the quantity in the mugs state
    setMugs((prevMugs) => ({
      ...prevMugs,
      [mug.color]: {
        ...prevMugs[mug.color],
        qty: prevMugs[mug.color].qty - mug.quantity,
      },
    }));
  }

  function handleDeleteItem(id) {
    const mugToDelete = cart.find((mug) => mug.id === id);
    setCart((prevCart) => prevCart.filter((mug) => mug.id !== id));

    // Restore the quantity in the mugs state
    setMugs((prevMugs) => ({
      ...prevMugs,
      [mugToDelete.color]: {
        ...prevMugs[mugToDelete.color],
        qty: prevMugs[mugToDelete.color].qty + mugToDelete.quantity,
      },
    }));
  }

  return (
    <div className="app">
      <Selections mugs={mugs} onAddtoCart={handleAddToCart} />
      <ShoppingList
        cart={cart}
        onDeleteItem={handleDeleteItem}
        totalQty={totalQty}
        totalPrice={totalPrice}
      />
    </div>
  );
}

function Selections({ mugs, onAddtoCart }) {
  const [selectedColor, setSelectedColor] = useState("white");
  const [quantity, setQuantity] = useState(1);

  function handleColorChange(color) {
    setSelectedColor(color);
    setQuantity(1);
  }

  function handleQuantity(value) {
    setQuantity(value);
  }

  function handleAddToCart() {
    const id = crypto.randomUUID();

    const mugSelections = {
      color: selectedColor,
      img: mugs[selectedColor].img,
      quantity: quantity,
      price: quantity * mugs[selectedColor].price,
      id: id,
    };

    onAddtoCart(mugSelections);
    setQuantity(1);
  }

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
      <select
        value={selectedColor}
        onChange={(e) => handleColorChange(e.target.value)}
      >
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
        {[...Array(mugs[selectedColor].qty)].map((_, i) => (
          <option value={i + 1} key={i}>
            {i + 1}
          </option>
        ))}
      </select>

      <br />

      <button onClick={() => handleAddToCart()}>Add to Cart</button>
    </div>
  );
}

function ShoppingList({ cart, onDeleteItem, totalQty, totalPrice }) {
  return (
    <div className="cart-container">
      <div className="shopping-list">
        {cart.map((mugInCart, i) => (
          <div className="mug-in-cart" key={i}>
            <img src={mugInCart.img} alt={`${mugInCart.color} coffee mug`} />
            <p>Qty: {mugInCart.quantity}</p>
            <p>Price: {mugInCart.price.toFixed(2)}</p>
            <p
              className="delete-item"
              onClick={() => onDeleteItem(mugInCart.id)}
            >
              ❌
            </p>
          </div>
        ))}
      </div>
      <div className="grand-total">
        Total Items: {totalQty} | Total Price: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
}

export default App;
