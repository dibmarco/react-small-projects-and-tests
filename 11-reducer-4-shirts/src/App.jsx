import { useReducer, useState } from "react";

const initialState = {
  white: {
    img: "imgs/fnm_white.jpg",
    qty: 2,
    price: 10.0,
  },
  black: {
    img: "imgs/fnm_black.jpg",
    qty: 3,
    price: 12.0,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "addToCart": {
      return {
        ...state,
        [action.shirtColor]: {
          ...state[action.shirtColor],
          qty: state[action.shirtColor].qty - action.payload.qty,
        },
      };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [shirtColor, setShirtColor] = useState("white");
  const [qty, setQty] = useState(1);
  const [itemsInCart, setItemsInCart] = useState([]);

  function handleItemsInCart() {
    const id = crypto.randomUUID();

    const itemInCart = {
      id: id,
      shirtColor: shirtColor,
      img: state[shirtColor].img,
      qty: qty,
      price: state[shirtColor].price,
    };

    setItemsInCart((prevItemsInCart) => [...prevItemsInCart, itemInCart]);
    dispatch({ type: "addToCart", shirtColor: shirtColor, payload: itemInCart });
  }

  return (
    <div>
      <Selections
        state={state}
        selectedShirt={state[shirtColor]}
        setShirtColor={setShirtColor}
        setQty={setQty}
        handleItemsInCart={handleItemsInCart}
      />
      {/* You can render the cart items here if needed */}
    </div>
  );
}

function Selections({ state, selectedShirt, setShirtColor, setQty, handleItemsInCart }) {
  return (
    <div>
      <img src={selectedShirt.img} alt="Shirt" width="200px" />
      <p>Price ${selectedShirt.price}.00</p>
      <select onChange={(e) => setShirtColor(e.target.value)}>
        {Object.keys(state).map((shirt, i) => (
          <option key={i} value={shirt}>
            {shirt}
          </option>
        ))}
      </select>
      <select onChange={(e) => setQty(+e.target.value)}>
        {[...Array(selectedShirt.qty)].map((_, i) => (
          <option value={i + 1} key={i}>
            {i + 1}
          </option>
        ))}
      </select>
      <button onClick={handleItemsInCart}>Add to Cart</button>
    </div>
  );
}

export default App;
