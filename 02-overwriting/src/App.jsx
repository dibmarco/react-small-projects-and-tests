import { useState } from "react";

const friends = {
  Jerry: 10,
  Elaine: 15,
  George: 0,
  Kramer: 2,
}

function App() {
  return (
    <div className="app">
      <p>Borrow money from one of your Seinfeld friends:</p>
      <Friends />
      <br />
      <Selections />
    </div>
  );
}

function Friends() {
  const friendNames = Object.keys(friends);
  console.log(friendNames);

  return <div className="friends">
    {friendNames.map((friend, i) => <div key={i}>{friend}: {friends[friend]}</div>)}
  </div>
}

function Selections() {
  return <div className="selections">Selections</div>
}

export default App;
