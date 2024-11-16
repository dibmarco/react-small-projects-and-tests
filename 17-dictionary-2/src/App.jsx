import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

function App() {
  const [query, setQuery] = useState("");
  const [word, setWord] = useState("");
  const inputEl = useRef(null);

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
          replace // not sure about this
          element={<DefinitionField setWord={setWord} />}
        />
      </Routes>
    </div>
  );
}

function QueryField({ inputEl, query, setQuery, setWord }) {
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
          setWord(query);
          setQuery("");
          navigate(`/${query}`);
        }}
      >
        Search
      </button>
    </>
  );
}

function DefinitionField({ setWord }) {
  const { wordDefinition } = useParams();

  useEffect(() => {
    setWord(wordDefinition);
    console.log(wordDefinition);
  }, [wordDefinition, setWord]);

  return <div>{wordDefinition}</div>;
}

export default App;
