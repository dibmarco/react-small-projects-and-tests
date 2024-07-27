import { useState, useEffect } from "react";

const initialShirts = {
  white: [
    { size: "small", qty: 3 },
    { size: "medium", qty: 4 },
    { size: "large", qty: 2 },
  ],
  grey: [
    { size: "medium", qty: 1 },
    { size: "large", qty: 2 },
  ],
  black: [
    { size: "small", qty: 3 },
    { size: "medium", qty: 5 },
  ],
};

// const selSize = initialShirts["white"];
// console.log(selSize);
// console.log(selSize[0].size);

function App() {
  const [shirts, setShirts] = useState(initialShirts);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [itemsInCart, setItemsInCart] = useState([]);

  function handleColorChange(e) {
    setColor(e.target.value);
    setSize("");
    setQuantity(0);
  }

  function handleSizeChange(e) {
    setSize(e.target.value);
    setQuantity(0);
  }

  function handleQuantityChange(e) {
    setQuantity(Number(e.target.value));
  }

  const availableSizes = color ? shirts[color] : [];
  const selectedSize = availableSizes.find((item) => item.size === size);
  const availableQty = selectedSize ? selectedSize.qty : 0;

  function handleAddToCart() {
    const id = crypto.randomUUID();

    const selections = {
      id: id,
      color: color,
      size: size,
      quantity: quantity,
    };

    /* console.log(selections); */

    setItemsInCart((prevItemsInCart) => [...prevItemsInCart, selections]);
    setColor("");
    setSize("");
    setQuantity(0);
  }

  function handleDeleteItem(id) {
    /* const itemToDelete = itemsInCart.find((item) => item.id === id); */
    /* console.log(itemToDelete); */
    setItemsInCart(itemsInCart.filter((item) => item.id !== id));
  }

  

  /* useEffect(() => {
    console.log(itemsInCart);
  }, [itemsInCart]); */

  return (
    <>
      <div className="selections">
        <p>Color</p>
        <select value={color} onChange={handleColorChange}>
          <option className="option-select" value="">
            Select color
          </option>
          {Object.keys(shirts).map((shirt, i) => (
            <option key={i} value={shirt}>
              {shirt}
            </option>
          ))}
        </select>

        <p>Size</p>
        <select disabled={!color} value={size} onChange={handleSizeChange}>
          <option className="option-select" value="">
            Select size
          </option>
          {availableSizes.map((item, i) => (
            <option key={i} value={item.size}>
              {item.size}
            </option>
          ))}
        </select>

        <p>Quantity</p>
        <select
          disabled={!size}
          value={quantity}
          onChange={handleQuantityChange}
        >
          <option className="option-select" value={0}>
            Select quantity
          </option>
          {[...Array(availableQty)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        {color && size && quantity ? (
          <button onClick={handleAddToCart}>OK</button>
        ) : (
          <button disabled>OK</button>
        )}
      </div>

      <ShoppingCart itemsInCart={itemsInCart} onDeleteItem={handleDeleteItem}/>
    </>
  );
}

function ShoppingCart({ itemsInCart, onDeleteItem }) {
  return (
    <div className="shopping-cart">
      {itemsInCart.map((item, i) => (
        <div className="cart-items" key={i}>
          <p>*</p>
          <p>{item.color} |</p>
          <p>{item.size} |</p>
          <p>{item.quantity} &#47;&#47;</p>
          <p className="delete-item" onClick={() => onDeleteItem(item.id)}>remove</p>
        </div>
      ))}
    </div>
  );
}

export default App;
