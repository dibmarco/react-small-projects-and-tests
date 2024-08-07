import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [newQuote, setNewQuote] = useState(0); // this only triggers a new rendering of the App.

  useEffect(() => {
    async function getQuotes() {
      try {
        const res = await fetch("https://type.fit/api/quotes");
        const quotes = await res.json();

        const maxQuotes = quotes.length;

        const randomQuote = function () {
          return Math.floor(Math.random() * maxQuotes);
        };

        const quote = quotes[randomQuote()];

        const { text, author } = quote;

        const authorAt0 = author ? author.split(",").at(0) : "Unknown";

        setText(text);
        setAuthor(authorAt0 === "type.fit" ? "Unknown" : authorAt0);
      } catch (error) {
        console.error("Error fetching quote:", error);
        setErrorMessage("Error fetching quote.");
      }
    }

    getQuotes();
  }, [newQuote]);

  function handleNewQuote() {
    setNewQuote(newQuote + 1);
  }

  function handleTweet() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "Share Quote",
      "width=600,height=300"
    );
  }

  return (
    <div className="quote-box">
      {!errorMessage ? (
        <div className="quote">
          <h1>&#x201C;{text}&#x201D;</h1>
          <p>&mdash;&nbsp;{author}</p>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
      <div className="buttons">
        <button onClick={handleNewQuote}>New Quote</button>
        <button onClick={handleTweet}>
          <i className="fa-brands fa-x-twitter"></i>&nbsp;Share
        </button>
      </div>
    </div>
  );
}

export default App;
