import { useState } from "react";

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
  const mugColors = Object.keys(mugs);
  const [selectedColor, setSelectedColor] = useState(mugColors[0]);
  const [mugsInCart, setMugsInCart] = useState([]);

  function handleAddToCart() {
    const id = crypto.randomUUID();

    const mugSelection = {
      id: id,
      color: selectedColor,
      img: mugs[selectedColor].img,
      price: mugs[selectedColor].price,
    }
/* 
    console.log(mugSelection); */
    setMugsInCart((prevSelections) => [...prevSelections, mugSelection]);
  }

  return (
    <div className="container">
      <Selections
        mugs={mugs}
        mugColors={mugColors}
        selectedColor={selectedColor}
        onSelectedColor={setSelectedColor}
        onAddToCart = {handleAddToCart}
      />
      <Cart mugsInCart={mugsInCart}/>
    </div>
  );
}

function Selections({ mugs, mugColors, selectedColor, onSelectedColor, onAddToCart }) {
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
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
}

function Cart({mugsInCart}) {
  return (
    <div className="cart">
      {mugsInCart.map((mug) => <div key={mug.id} className="cart-item">
        <img src={mug.img} alt={`${mug.color} mug`} />{mug.color} {mug.price}
        </div>)}
    </div>
  )
}

export default App;
