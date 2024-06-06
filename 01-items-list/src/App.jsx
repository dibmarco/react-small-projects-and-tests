import "./App.css";

function App() {
  return (
    <div className="App">
      <Selections />
      <ShoppingList />
    </div>
  );
}

function Selections() {
  return (
    <div>
      <label>Select your Coffee Mug</label>
      <img src="./public/imgs/black_mug.jpg" alt="white coffee mug" />
    </div>
  );
}

function ShoppingList() {
  return <div></div>;
}

export default App;
