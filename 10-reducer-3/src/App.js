import { useReducer, useState } from "react";

const initialState = {
  Jerry: 10,
  Elaine: 15,
  George: 0,
  Kramer: 2,
};

function reducer(state, action) {
  switch (action.type) {
    case "borrow": {
      return {
        ...state,
        [action.friend]: state[action.friend] - action.payload,
      };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [amount, setAmount] = useState(0);
  const [selectedFriend, setSelectedFriend] = useState(
    Object.keys(initialState)[0]
  );

  return (
    <>
      <Friends state={state} />
      <Selections
        dispatch={dispatch}
        amount={amount}
        setAmount={setAmount}
        selectedFriend={selectedFriend}
        setSelectedFriend={setSelectedFriend}
      />
    </>
  );
}

export default App;

function Friends({ state }) {
  return (
    <div>
      {Object.keys(state).map((friend) => (
        <p key={friend}>
          {friend} ${state[friend]}
        </p>
      ))}
    </div>
  );
}

function Selections({
  dispatch,
  amount,
  setAmount,
  selectedFriend,
  setSelectedFriend,
}) {
  return (
    <div>
      Borrow{" "}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />{" "}
      from
      <select onChange={(e) => setSelectedFriend(e.target.value)}>
        {Object.keys(initialState).map((friend) => (
          <option key={friend}>{friend}</option>
        ))}
      </select>
      <button onClick={() => dispatch({ type: "borrow", friend: selectedFriend, payload: amount })}>
        OK
      </button>
    </div>
  );
}
