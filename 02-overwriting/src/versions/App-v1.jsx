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
  const [value, setValue] = useState("");

  function handleSelectedFriend(friend) {
    setSelectedFriend(friend);
  }

  function handleBorrow() {
    if (selectedFriend && value > 0 && value <= friends[selectedFriend]) {
      const updatedFriends = {
        ...friends,
        [selectedFriend]: friends[selectedFriend] - value,
      };
      setFriends(updatedFriends);

      // Resetting the state to initial values
      setSelectedFriend("");
      setValue("");
    } else {
      alert("Invalid borrow amount.");
      setSelectedFriend("");
      setValue("");
      
    }
  }

  return (
    <div className="app">
      <p>Borrow money from one of your Seinfeld friends:</p>
      <Friends friends={friends} />
      <br />
      <Selections
        friendNames={Object.keys(friends)}
        selectedFriend={selectedFriend}
        onSelectFriend={handleSelectedFriend}
        value={value}
        onEnterValue={setValue}
        borrow={handleBorrow}
      />
    </div>
  );
}

function Friends({ friends }) {
  const friendNames = Object.keys(friends);

  return (
    <div className="friends">
      {friendNames.map((friend, i) => (
        <div key={i}>
          {friend}: ${friends[friend]}
        </div>
      ))}
    </div>
  );
}

function Selections({
  friendNames,
  selectedFriend,
  onSelectFriend,
  value,
  onEnterValue,
  borrow,
}) {
  return (
    <div className="selections">
      <p>Select a friend:</p>
      <select
        value={selectedFriend}
        onChange={(e) => onSelectFriend(e.target.value)}
      >
        <option value="">-select-</option>
        {friendNames.map((friend, i) => (
          <option key={i} value={friend}>
            {friend}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={value}
        onChange={(e) => onEnterValue(Number(e.target.value))}
        placeholder="Enter value"
      />
      <button onClick={borrow}>Borrow</button>
    </div>
  );
}

export default App;
