import { useEffect, useReducer, useState } from "react";

const initialState = {
  white: {
    img: "imgs/fnm_white.jpg",
    qty: 2,
    price: 10,
  },
  black: {
    img: "imgs/fnm_black.jpg",
    qty: 3,
    price: 12,
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
    case "deleteItem": {
      return {
        ...state,
        [action.payload.shirtColor]: {
          ...state[action.payload.shirtColor],
          qty: state[action.payload.shirtColor].qty + action.payload.qty,
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

  function handleAddItem() {
    const id = crypto.randomUUID();

    const itemInCart = {
      id: id,
      shirtColor: shirtColor,
      img: state[shirtColor].img,
      qty: qty,
      price: state[shirtColor].price,
    };

    setItemsInCart((prevItemsInCart) => [...prevItemsInCart, itemInCart]);
    dispatch({
      type: "addToCart",
      shirtColor: shirtColor,
      payload: itemInCart,
    });
  }

  function handleDeleteItem(id) {
    const itemToDelete = itemsInCart.find((item) => item.id === id);

    setItemsInCart(itemsInCart.filter((item) => item.id !== id));

    dispatch({
      type: "deleteItem",
      payload: itemToDelete,
    });
  }

  useEffect(() => {
    setQty(1);
  }, [shirtColor]);

  return (
    <div className="container">
      <Selections
        state={state}
        selectedShirt={state[shirtColor]}
        setShirtColor={setShirtColor}
        qty={qty}
        setQty={setQty}
        handleAddItem={handleAddItem}
      />
      <Cart itemsInCart={itemsInCart} handleDeleteItem={handleDeleteItem} />
    </div>
  );
}

function Selections({
  state,
  selectedShirt,
  setShirtColor,
  qty,
  setQty,
  handleAddItem,
}) {
  return (
    <div>
      <img src={selectedShirt.img} alt="Shirt" width="200px" />
      <p>Price ${selectedShirt.price}.00</p>
      
      <div className="selections">
      <select
        onChange={(e) => {
          setShirtColor(e.target.value);
        }}
        value={selectedShirt.color}
      >
        {Object.keys(state).map((shirt, i) => (
          <option key={i} value={shirt}>
            {shirt}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => setQty(+e.target.value)}
        value={qty}
      >
        {selectedShirt.qty === 0 ? (
          <option value="0">Sold out</option>
        ) : (
          [...Array(selectedShirt.qty)].map((_, i) => (
            <option value={i + 1} key={i}>
              {i + 1}
            </option>
          ))
        )}
      </select>
      <button onClick={handleAddItem} disabled={selectedShirt.qty === 0}>
        Add to Cart
      </button>
      </div>
    </div>
  );
}

function Cart({ itemsInCart, handleDeleteItem }) {
  return (
    <div>
      {itemsInCart.map((item, i) => (
        <div className="cart-item" key={item.id}>
          <img src={item.img} alt="shirt" width="50px" />
          <p>| Quantity: {item.qty} | </p>
          <p>Price: ${item.qty * item.price} |</p>
          <p className="delete-item" onClick={() => handleDeleteItem(item.id)}>
            ❌
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;