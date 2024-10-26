import { useState, useEffect } from "react";
import generateID from "./generateID";

const initialMugs = {
  white: {
    img: "imgs/white_mug.jpg",
    price: 12.49,
    qty: 2,
  },
  brown: {
    img: "imgs/brown_mug.jpg",
    price: 13.49,
    qty: 3,
  },
  black: {
    img: "imgs/black_mug.jpg",
    price: 15.49,
    qty: 5,
  },
};

function App() {
  const [mugs, setMugs] = useState(() => {
    const savedMugs = localStorage.getItem("mugs");
    return savedMugs ? JSON.parse(savedMugs) : initialMugs;
  });
  const mugColors = Object.keys(mugs);

  const [selectedColor, setSelectedColor] = useState(mugColors[0]);
  const [quantity, setQuantity] = useState(1);
  const [mugsInCart, setMugsInCart] = useState(() => {
    const savedMugsInCart = localStorage.getItem("mugsInCart");
    return savedMugsInCart ? JSON.parse(savedMugsInCart) : [];
  });

  function handleQuantity(qty) {
    setQuantity(qty);
  }

  function handleAddToCart() {
    const id = generateID();

    const mugSelection = {
      id: id,
      img: mugs[selectedColor].img,
      qty: quantity,
      color: selectedColor,
      price: mugs[selectedColor].price,
    };
    // console.log(mugSelection);
    setMugsInCart((prevSelections) => [...prevSelections, mugSelection]);

    setMugs((prevMugs) => ({
      ...prevMugs,
      [selectedColor]: {
        ...prevMugs[selectedColor],
        qty: prevMugs[selectedColor].qty - quantity,
      },
    }));
  }

  function handleDeleteItem(id) {
    const itemToDelete = mugsInCart.find((item) => item.id === id);
    // console.log(itemToDelete);
    setMugsInCart(mugsInCart.filter((item) => item.id !== id));

    setMugs((prevMugs) => ({
      ...prevMugs,
      [itemToDelete.color]: {
        ...prevMugs[itemToDelete.color],
        qty: prevMugs[itemToDelete.color].qty + itemToDelete.qty,
      },
    }));
  }

  useEffect(() => {
    setQuantity(1);
  }, [selectedColor]);

  useEffect(() => {
    localStorage.setItem("mugs", JSON.stringify(mugs));
  }, [mugs]);

  useEffect(() => {
    localStorage.setItem("mugsInCart", JSON.stringify(mugsInCart));
  }, [mugsInCart]);

  return (
    <div className="container">
      <Selections
        mugs={mugs}
        mugColors={mugColors}
        selectedColor={selectedColor}
        onSelectedColor={setSelectedColor}
        onAddToCart={handleAddToCart}
        quantity={quantity}
        onHandleQuantity={handleQuantity}
      />
      <Cart mugsInCart={mugsInCart} onDeleteItem={handleDeleteItem} />
    </div>
  );
}

function Selections({
  mugs,
  mugColors,
  selectedColor,
  onSelectedColor,
  onAddToCart,
  quantity,
  onHandleQuantity,
}) {
  return (
    <div className="selections">
      <img src={mugs[selectedColor].img} alt={`${selectedColor} mug`} />
      <p className="price">{mugs[selectedColor].price}</p>
      <div className="radio-btns">
        {mugColors.map((color, i) => (
          <div key={i}>
            <input
              type="radio"
              /* id={color}
              value={color} */
              name="mug"
              checked={selectedColor === color}
              onChange={() => onSelectedColor(color)}
            />
            <label
              htmlFor={color}
              /* style={{ color: color === "white" ? "grey" : color }} */
            >
              {color}
            </label>
          </div>
        ))}
      </div>
      <br />
      <select
        value={quantity}
        onChange={(e) => onHandleQuantity(+e.target.value)}
      >
        {[...Array(mugs[selectedColor].qty)].map((_, i) => (
          <option value={i + 1} key={i}>
            {i + 1}
          </option>
        ))}
      </select>
      <br />
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
}

function Cart({ mugsInCart, onDeleteItem }) {
  return (
    <div className="cart">
      {mugsInCart.map((mug) => (
        <div key={mug.id} className="cart-item">
          <img src={mug.img} alt={`${mug.color} mug`} />
          <p>{mug.qty}</p>
          <p>{mug.color}</p>
          <p>{mug.price * mug.qty}</p>
          <p className="delete" onClick={() => onDeleteItem(mug.id)}>
            ❌
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
