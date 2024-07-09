import { useState, useEffect } from "react";

function App() {
  const [quote, setQuote] = useState("");
  const [nextQuote, setNextQuote] = useState(0); // this only triggers a new rendeding of the app
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(
    () =>
      async function getQuote() {
        try {
          const res = await fetch("https://type.fit/api/quotes");
          const quotes = await res.json();

          const maxQuotes = quotes.length;

          const randomQuote = function () {
            return Math.floor(Math.random() * maxQuotes) + 1;
          };

          setQuote(quotes[randomQuote()]);
        } catch (error) {
          console.error("Error fetching quote:", error);
          setErrorMessage("Error fetching quote.");
        }
      },
    [nextQuote]
  );

  function handleNextQuote() {
    setNextQuote(nextQuote + 1);
  }

  function handleTweet() {
    const text = quote.text;
    const author = quote.author;

    window.open(`https://twitter.com/intent/tweet?text=${text author}`, "Share Quote", "width=600, height=300");
  }

  return (
    <div>
      {!errorMessage ? (
        <div>
          <h1>{quote.text}</h1>
          <p>{quote.author}</p>
        </div>
      ) : (
        errorMessage
      )}
      <button onClick={handleNextQuote}>Next Quote</button>
      <button onClick={handleTweet}>Tweet Quote</button>
    </div>
  );
}

export default App;
