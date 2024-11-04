import { useState, useEffect } from "react";

function App() {
  const [amount, setAmount] = useState("1");
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("BRL");
  const [isLoading, setIsLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [standardRate, setStandardRate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [error, setError] = useState(null);

  const standardAmount = 1;

  useEffect(() => {
    if (fromCur === toCur) {
      setConvertedAmount(amount);
      setStandardRate(1);
      return;
    }

    async function fetchRates() {
      setError(null);
      setIsLoading(true);

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
      } catch (e) {
        setError("Something went wrong.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    if (parseFloat(amount) > 0) {
      fetchRates();
    } else {
      setError("Enter a valid amount");
      setConvertedAmount(null);
      /* setStandardRate(null); */
      /* setFormattedDate(null); */
      setIsLoading(false);
    }
  }, [fromCur, toCur, amount]);

  function handleInputValue(e) {
    let value = e.target.value;

    // Replace comma with dot
    const sanitizedValue = value.replace(",", ".");

    // Validate input (allow only numbers and dot)
    const validInput = /^[0-9]*[.]?[0-9]{0,2}$/.test(sanitizedValue);

    if (validInput) {
      setAmount(sanitizedValue);
      if (sanitizedValue === "" || parseFloat(sanitizedValue) === 0) {
        setError("Enter a valid amount");
        setConvertedAmount(null);
        /* setStandardRate(null); */
        /* setFormattedDate(null); */
      } else {
        setError(null);
      }
    }
  }

  // Format numbers to en-US standard
  const numberFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
        value={fromCur}
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
        value={toCur}
      >
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
      </select>
      <div className="convertion-results">
        <p className="secondary-result">
          {numberFormatter.format(parseFloat(amount))} {fromCur} =
        </p>
        {amount === 0 || amount === "" ? (
          <p className="main-result">0</p>
        ) : isLoading ? (
          <p className="main-result">Calculating...</p>
        ) : (
          <p className="main-result">
            {!error && !isLoading
              ? numberFormatter.format(parseFloat(convertedAmount))
              : error}{" "}
            {!error ? toCur : ""}
          </p>
        )}
        <p className="secondary-result">
          {`${standardAmount} ${fromCur} = ${
            !standardRate
              ? numberFormatter.format(standardRate)
              : standardRate.toFixed(3)
          } ${toCur}`}{" "}
          as at <span>{formattedDate}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
