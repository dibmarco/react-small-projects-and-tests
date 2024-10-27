import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [definition, setDefinition] = useState(null);

  function handleDefinition(word) {
    async function fetchWord() {
      if (word.trim() === "") {
        alert("Enter a word!");
        return;
      }

      setInput("");
      setError(null);
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        if (!res.ok) {
          throw new Error("No Definitions Found");
        }
        const [data] = await res.json();
        console.log(data);
        setDefinition(data);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWord();
  }

  return (
    <div className="App">
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => handleDefinition(input.toLocaleLowerCase())}>Search</button>
      </div>
      {isLoading && <p>Searching...</p>}
      {!isLoading && !error && definition && (
        <div className="definition-section">
          <p style={{ fontWeight: "600" }}>{definition.word.toUpperCase()}</p>
          <p>{definition.phonetic}</p>
          {definition.meanings.map((meaning, i) => (
            <div key={i}>
              <p style={{ fontWeight: "600", marginTop: "10px" }}>
                {meaning.partOfSpeech}
              </p>
              <ul>
                {meaning.definitions.map((def, j) => (
                  <li key={j}>{def.definition}</li>
                ))}
              </ul>
              {meaning.synonyms.length > 0 && (
                <p>
                  Synonyms:{" "}
                  {meaning.synonyms.map((synonym) => (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDefinition(synonym)}
                    >
                      {synonym}
                      {" / "}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div>
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
