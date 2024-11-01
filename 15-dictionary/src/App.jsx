import { useState, useEffect, useRef } from "react";
import { InputField } from "./components/InputField";

function App() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [definition, setDefinition] = useState(null);

  const queryRef = useRef();

  useEffect(() => {
    queryRef.current?.focus();
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleDefinition(query);
    }
  }

  function handleDefinition(query) {
    async function fetchWord() {
      if (query.trim() === "") {
        alert("Enter a word!");
        return;
      }

      setQuery("");
      setError(null);
      setIsLoading(true);

      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
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
        queryRef.current?.blur();
      }
    }
    fetchWord();
  }

  return (
    <div className="App">
      <InputField
        value={query}
        query={query}
        queryRef={queryRef}
        setQuery={setQuery}
        handleKeyDown={handleKeyDown}
        handleDefinition={handleDefinition}
      />
      <div className="definition-field">
        {isLoading && (
          <div className="loading">
            <p>Searching...</p>
          </div>
        )}
        {!isLoading && error && (
          <div className="error-message">
            <p>{error.message}</p>
          </div>
        )}
        {!isLoading && !error && definition && (
          <div className="definition">
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
                        key={synonym}
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
      </div>
    </div>
  );
}

export default App;
