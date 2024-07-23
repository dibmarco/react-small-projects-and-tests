import { useState, useEffect } from "react";

function App() {
  const [amount, setAmount] = useState("1");
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("BRL");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [standardRate, setStandardRate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [error, setError] = useState(null);

  const standardAmount = 1;

  useEffect(() => {
    if (fromCur === toCur) {
      setConvertedAmount(amount);
      return;
    }

    async function fetchRates() {
      setError(null);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong.");
        }

        const data = await res.json();
        /* console.log(data); */

        const [rate] = Object.values(data.rates);
        setStandardRate(rate / parseFloat(amount));
        setConvertedAmount(rate.toFixed(2));

        const date = new Date(data.date);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        setFormattedDate(formattedDate);
      } catch {
        setError("Something went wrong.");
      }
    }
    fetchRates();
  }, [fromCur, toCur, amount]);

  function handleInputValue(e) {
    let value = e.target.value;

    // Replace commas with dots
    const sanitizedValue = value.replace(",", ".");

    // Validate input (allow only numbers and dot)
    const validInput = /^[0-9]*[.]?[0-9]{0,2}$/.test(sanitizedValue);

    if (validInput) {
      setAmount(sanitizedValue);
    }
  }

  return (
    <div className="container">
      <p className="p-amount">Amount</p>
      <input
        className="input-amount"
        type="text"
        value={amount}
        onChange={handleInputValue}
      />
      <p className="p-from">From</p>
      <select
        className="btn btn-primary dropdown-toggle select-from"
        name="from"
        id="from"
        onChange={(e) => setFromCur(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="BRL">BRL</option>
      </select>
      <p className="p-to">To</p>
      <select
        className="btn btn-secondary dropdown-toggle select-to"
        name="to"
        id="to"
        onChange={(e) => setToCur(e.target.value)}
      >
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
      </select>
      <div className="convertion-results">
        <p className="secondary-result">
          {amount} {fromCur} =
        </p>
        {amount === 0 || amount === "" ? (
          <p className="main-result">0</p>
        ) : (
          <p className="main-result">
            {!error ? convertedAmount : error} {!error ? toCur : ""}
          </p>
        )}
        <p className="secondary-result">
          {`${standardAmount} ${fromCur} = ${
            !standardRate ? standardRate : standardRate.toFixed(3)
          } ${toCur}`}{" "}
          on <span>{formattedDate}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
