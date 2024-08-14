import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      throw new Error("Cannot compute");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 }); // O primeiro argumento em useReducer é a função reducer. O segundo argumento é "state". Portanto, state.count = 0;

  function increment() {
    dispatch({ type: "increment", payload: 1 }); // É a função dispatch que alimenta o argumento "action". Portanto, verifica-se type.action em switch.
  }

  function decrement() {
    dispatch({ type: "decrement", payload: 1 });
  }

  return (
    <div className="container">
      <button onClick={decrement}>-</button>
      <span>{state.count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

export default App;
