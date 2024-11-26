import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

function App() {
  const [query, setQuery] = useState("");
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  return (
    <div className="App">
      <QueryField
        inputEl={inputEl}
        query={query}
        setQuery={setQuery}
        setWord={setWord}
      />
      <Routes>
        <Route
          path="/:wordDefinition"
          element={
            <DefinitionField
              word={word}
              setWord={setWord}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              error={error}
              setError={setError}
            />
          }
        />
      </Routes>
    </div>
  );
}

function QueryField({ inputEl, query, setQuery }) {
  const navigate = useNavigate();

  return (
    <>
      <input
        type="text"
        value={query}
        ref={inputEl}
        placeholder="Enter a word"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={() => {
          navigate(`/${query}`);
          setQuery("");
        }}
      >
        Search
      </button>
    </>
  );
}

function DefinitionField({ isLoading, setIsLoading, error, setError }) {
  const { wordDefinition } = useParams();
  const [word, setWord] = useState(null);

  useEffect(() => {
    async function fetchDefinition() {
      try {
        setIsLoading(true);

        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${wordDefinition}`
        );

        if (!res.ok) throw new Error("Failed fetching definition.");

        const [data] = await res.json();
        console.log(data);

        setWord(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDefinition();
  }, [setIsLoading, setWord, wordDefinition, setError]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {word && (
        <>
          <h1>{word.word}</h1>
          {word.meanings.map((meaning) => (
            <div key={meaning.partOfSpeech}>
              <h2>{meaning.partOfSpeech}</h2>
              <ul>
                {meaning.definitions.map((definition) => (
                  <li key={definition.definition}>{definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
