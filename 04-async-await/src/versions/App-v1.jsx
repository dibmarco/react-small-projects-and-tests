import { useState, useEffect } from "react";

function App() {
  const [quote, setQuote] = useState("");
  const [newQuote, setNewtQuote] = useState(0); // this only triggers a new rendeding of the App.
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
    [newQuote]
  );

  function handleNewQuote() {
    setNewtQuote(newQuote + 1);
  }

  function handleTweet() {
    window.open(
      `https://twitter.com/intent/tweet?text=${quote.text}`,
      "Share Quote",
      "width=600,height=300"
    );
  }

  return (
    <div className="quote-box">
      {!errorMessage ? (
        <div className="quote">
          <h1>&#x201C;{quote.text}&#x201D;</h1>
          <p>&mdash;&nbsp;{quote.author}</p>
        </div>
      ) : (
        errorMessage
      )}
      <div className="buttons">
      <button onClick={handleNewQuote}>New Quote</button>
      <button onClick={handleTweet}><i class="fa-brands fa-x-twitter"></i>&nbsp;Share</button>
      </div>
    </div>
  );
}

export default App;
