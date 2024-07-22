import { useState, useEffect } from "react";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BRL");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (from === to) {
      setConvertedAmount(amount);
      return;
    }

    async function fetchRates() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong. Try Again");
        }

        const data = await res.json();
        /* console.log(data); */
        const [rate] = Object.values(data.rates);
        /* console.log(rate); */
        setConvertedAmount(rate.toFixed(2));
      } catch {
        setError("Something went wrong. Try again.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchRates();
  }, [from, to, amount]);

  return (
    <div className="container">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
      />
      <select
        name="from"
        id="from"
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="BRL">BRL</option>
      </select>
      <select
        name="to"
        id="to"
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="EUR">GBP</option>
      </select>
      <div className="result">{!error ? convertedAmount : error}</div>
    </div>
  );
}

export default App;
