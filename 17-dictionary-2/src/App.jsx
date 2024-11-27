import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

function App() {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  return (
    <div className="App">
      <QueryField inputEl={inputEl} />
      <Routes>
        <Route path="/:wordToFetch" element={<DefinitionField />} />
      </Routes>
    </div>
  );
}

function QueryField({ inputEl }) {
  const [query, setQuery] = useState("");
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

function DefinitionField() {
  const { wordToFetch } = useParams();
  const [word, setWord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  useEffect(() => {
    async function fetchDefinition() {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}${wordToFetch}`);

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
  }, [setIsLoading, setWord, wordToFetch, setError]);

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
