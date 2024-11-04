import { useEffect, useReducer } from "react";

const initialState = {
  standardAmount: 1,
  amount: 1,
  fromCur: "USD",
  toCur: "BRL",
  isLoading: false,
  convertedAmount: null,
  standardRate: null,
  formattedDate: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_FROMCUR":
      return { ...state, fromCur: action.payload };
    case "SET_TOCUR":
      return { ...state, toCur: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_CONVERTED_AMOUNT":
      return { ...state, convertedAmount: action.payload };
    case "SET_STANDARD_RATE":
      return { ...state, standardRate: action.payload };
    case "SET_FORMATTED_DATE":
      return { ...state, formattedDate: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function App() {
  const [
    {
      standardAmount,
      amount,
      fromCur,
      toCur,
      isLoading,
      convertedAmount,
      standardRate,
      formattedDate,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (fromCur === toCur) {
      dispatch({ type: "SET_CONVERTED_AMOUNT", payload: amount });

      dispatch({ type: "SET_STANDARD_RATE", payload: 1 });
      return;
    }

    async function fetchRates() {
      dispatch({ type: "SET_ERROR", payload: null });

      dispatch({ type: "SET_IS_LOADING", payload: true });

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
        dispatch({
          type: "SET_STANDARD_RATE",
          payload: rate / parseFloat(amount),
        });

        dispatch({ type: "SET_CONVERTED_AMOUNT", payload: rate.toFixed(2) });

        const date = new Date(data.date);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        dispatch({ type: "SET_FORMATTED_DATE", payload: formattedDate });
      } catch (e) {
        dispatch({ type: "SET_ERROR", payload: "Something went wrong." });
        console.error(e);
      } finally {
        dispatch({ type: "SET_IS_LOADING", payload: false });
      }
    }

    if (parseFloat(amount) > 0) {
      fetchRates();
    } else {
      dispatch({ type: "SET_ERROR", payload: null });
      dispatch({ type: "SET_CONVERTED_AMOUNT", payload: null });
      dispatch({ type: "SET_STANDARD_RATE", payload: null });
      dispatch({ type: "SET_FORMATTED_DATE", payload: "" });
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  }, [fromCur, toCur, amount]);

  function handleInputValue(e) {
    let value = e.target.value;

    // Replace comma with dot
    const sanitizedValue = value.replace(",", ".");

    // Validate input (allow only numbers and dot)
    const validInput = /^[0-9]*[.]?[0-9]{0,2}$/.test(sanitizedValue);

    if (validInput) {
      dispatch({ type: "SET_AMOUNT", payload: sanitizedValue });

      if (sanitizedValue === "" || parseFloat(sanitizedValue) === 0) {
        dispatch({ type: "SET_ERROR", payload: "Enter a valid amount." });
        dispatch({ type: "SET_CONVERTED_AMOUNT", payload: null });
        dispatch({ type: "SET_STANDARD_RATE", payload: null });
        dispatch({ type: "SET_FORMATTED_DATE", payload: "" });
      } else {
        dispatch({ type: "SET_ERROR", payload: "" });
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
        onChange={(e) =>
          dispatch({ type: "SET_FROMCUR", payload: e.target.value })
        }
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
        onChange={(e) =>
          dispatch({ type: "SET_TOCUR", payload: e.target.value })
        }
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
