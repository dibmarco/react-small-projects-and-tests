import { useState } from "react";

const initialFriends = {
  Jerry: 10,
  Elaine: 15,
  George: 0,
  Kramer: 2,
};

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [amountToBorrow, setAmountToBorrow] = useState(0);

  function handleSelectedFriend(friend) {
    setSelectedFriend(friend);
  }

  function handleAmountToBorrow(amount) {
    setAmountToBorrow(amount);
  }

  function handleBorrow() {
    if (
      selectedFriend &&
      amountToBorrow > 0 &&
      amountToBorrow <= friends[selectedFriend] &&
      friends[selectedFriend] > 0
    ) {
      const updatedFriends = {
        ...friends,
        [selectedFriend]: friends[selectedFriend] - amountToBorrow,
      };

      setFriends(updatedFriends);
    } else {
      alert("Enter valid amount");
    }
  }

  return (
    <div className="app">
      <p>Borrow money from one of your Seinfeld friends:</p>
      <Friends friends={friends} />
      <Selections
        friends={Object.keys(friends)}
        onSelectFriend={handleSelectedFriend}
        onEnterAmount={handleAmountToBorrow}
        onBorrow={handleBorrow}
      />
    </div>
  );
}

function Friends({ friends }) {
  const friendName = Object.keys(friends);
  // console.log(friendName);

  return (
    <div>
      {friendName.map((friend, i) => (
        <p key={i}>
          {friend}: ${friends[friend]}
        </p>
      ))}
    </div>
  );
}

function Selections({ friends, onSelectFriend, onEnterAmount, onBorrow }) {
  return (
    <div className="selections">
      <p>Borrow</p>
      <input
        type="number"
        placeholder="$"
        onChange={(e) => onEnterAmount(e.target.value)}
      />
      <p>from</p>
      <select onChange={(e) => onSelectFriend(e.target.value)}>
        <option value="">-select-</option>
        {friends.map((friend, i) => (
          <option value={friend} key={i}>
            {friend}
          </option>
        ))}
      </select>
      <button onClick={() => onBorrow()}>OK</button>
    </div>
  );
}

export default App;
