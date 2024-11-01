import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { InputField } from "./components/InputField";
import { DefinitionField } from "./components/DefinitionField";

function App() {
  const [query, setQuery] = useState("");
  const [currentWord, setCurrentWord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [definition, setDefinition] = useState(null);
  const queryRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    queryRef.current?.focus();
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter" && query) {
      navigate(`/${query}`);
    }

    if (e.key === "Enter" && !query) {
      alert("Enter a word");
    }

    if (query === currentWord) {
      setQuery("");
      return;
    }
  }

  function handleDefinition(word) {
    async function fetchWord() {
      if (word.trim() === "") {
        alert("Enter a word.");
        return;
      }

      if (word === currentWord) {
        return; // Skip if the word is the same as the last fetched word
      }

      setCurrentWord(word);
      setQuery("");
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
        setDefinition(data);
      } catch (err) {
        setError(err);
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
        query={query}
        queryRef={queryRef}
        setQuery={setQuery}
        currentWord={currentWord}
        handleKeyDown={handleKeyDown}
        handleDefinition={handleDefinition}
      />
      <Routes>
        <Route
          path="/:word"
          element={
            <DefinitionField
              isLoading={isLoading}
              error={error}
              definition={definition}
              handleDefinition={handleDefinition}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
