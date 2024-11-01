import { useState, useEffect, useRef } from "react";
import { InputField } from "./components/InputField";
import { DefinitionField } from "./components/DefinitionField";

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
      <DefinitionField
        isLoading={isLoading}
        error={error}
        definition={definition}
        handleDefinition={handleDefinition}
      />
    </div>
  );
}

export default App;
