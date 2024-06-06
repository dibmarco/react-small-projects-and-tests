const mugs = [
  {
    white: { img: "./public/imgs/white.jpg", price: 12.49 },
    black: { img: "./public/imgs/black.jpg", price: 14.49 },
    brown: { img: "./public/imgs/brown.jpg", price: 10.49 },
  },
];

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
      <img src="imgs/white_mug.jpg" alt="white coffee mug" />
    </div>
  );
}

function ShoppingList() {
  return <div></div>;
}

export default App;
