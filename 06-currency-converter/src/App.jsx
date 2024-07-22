import { useState, useEffect } from "react";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BRL");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [standardRate, setStandardRate] = useState(null);
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);

  const standardAmount = 1;

  useEffect(() => {
    if (from === to) {
      setConvertedAmount(amount);
      return;
    }

    async function fetchRates() {
      setError(null);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong. Try Again");
        }

        const data = await res.json();
        console.log(data);

        const [rate] = Object.values(data.rates);
        setStandardRate(rate / amount);
        setConvertedAmount(rate.toFixed(2));
        setDate(data.date);
      } catch {
        setError("Something went wrong. Try again.");
      }
    }
    fetchRates();
  }, [from, to, amount]);

  return (
    <div className="container">
      <p className="p-amount">Amount</p>
      <input
        className="input-amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <p className="p-from">From</p>
      <select
        className="btn btn-primary dropdown-toggle select-from"
        name="from"
        id="from"
        onChange={(e) => setFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="BRL">BRL</option>
      </select>
      <p>To</p>
      <select
        className="btn btn-secondary dropdown-toggle select-to"
        name="to"
        id="to"
        onChange={(e) => setTo(e.target.value)}
      >
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
      </select>
      <div className="convertion-results">
        <p>
          {amount} {from} =
        </p>
        <p className="main-result">
          {!error ? convertedAmount : error}&nbsp;{to}
        </p>
        <p>
          {`${standardAmount} ${from} = ${
            !standardRate ? standardRate : standardRate.toFixed(3)
          } ${to}`}{" "}
          on <span>{date}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
