import { useState } from "react";

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

  const availableColors = Object.keys(shirts).filter((color) =>
    shirts[color].some((item) => item.qty > 0)
  ); // Check if any size has stock
  const availableSizes = color
    ? shirts[color].filter((item) => item.qty > 0)
    : []; // Only sizes with stock available
  const selectedSize = availableSizes.find((item) => item.size === size);
  const availableQty = selectedSize ? selectedSize.qty : 0;

  function handleAddToCart() {
    const id = crypto.randomUUID();

    const selections = {
      id: id,
      color: color,
      size: size,
      qty: quantity,
    };

    setItemsInCart((prevItemsInCart) => [...prevItemsInCart, selections]);

    setShirts((prevShirts) => ({
      ...prevShirts,
      [color]: prevShirts[color].map((item) =>
        item.size === size ? { ...item, qty: item.qty - quantity } : item
      ),
    }));

    setColor("");
    setSize("");
    setQuantity(0);
  }

  function handleDeleteItem(id) {
    const itemToDelete = itemsInCart.find((item) => item.id === id);

    if (!itemToDelete) return;

    setItemsInCart((prevItemsInCart) =>
      prevItemsInCart.filter((item) => item.id !== id)
    );

    setShirts((prevShirts) => ({
      ...prevShirts,
      [itemToDelete.color]: prevShirts[itemToDelete.color].map((item) =>
        item.size === itemToDelete.size
          ? { ...item, qty: item.qty + itemToDelete.qty }
          : item
      ),
    }));

    setColor("");
    setSize("");
    setQuantity(0);
  }

  return (
    <>
      <div className="selections">
        <p>Color</p>
        <select
          value={color}
          onChange={handleColorChange}
          disabled={availableColors.length === 0}
        >
          {availableColors.length === 0 ? (
            <option className="option-select" value="SOLD OUT">
              SOLD OUT
            </option>
          ) : (
            <>
              <option className="option-select" value="">
                Select color
              </option>
              {availableColors.map((shirt, i) => (
                <option key={i} value={shirt}>
                  {shirt}
                </option>
              ))}
            </>
          )}
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

      <ShoppingCart itemsInCart={itemsInCart} onDeleteItem={handleDeleteItem} />
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
          <p>{item.qty} &#47;&#47;</p>
          <p className="delete-item" onClick={() => onDeleteItem(item.id)}>
            remove
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
