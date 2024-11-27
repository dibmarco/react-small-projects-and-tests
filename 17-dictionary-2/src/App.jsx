import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import useFetchDefinition from "./hooks/useFetchDefinition";

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
  const { word, isLoading, error } = useFetchDefinition(wordToFetch);

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
