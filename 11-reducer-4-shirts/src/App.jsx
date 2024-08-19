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
      return state; // Implement add to cart logic here
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [shirtColor, setShirtColor] = useState("white");

  return (
    <div>
      <Selections
        initialState={initialState}
        state={state[shirtColor]}
        setShirtColor={setShirtColor}
      />
    </div>
  );
}

function Selections({ initialState, state, setShirtColor }) {
  return (
    <div>
      <img src={state.img} alt="Shirt" width="200px" />
      <p>Price {state.price}.00</p>
      <select onChange={(e) => setShirtColor(e.target.value)}>
        {Object.keys(initialState).map((shirt, i) => (
          <option key={i} value={shirt}>
            {shirt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
