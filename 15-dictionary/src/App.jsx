import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useReducer, useCallback, useEffect, useRef } from "react";
import InputField from "./components/InputField";
import DefinitionField from "./components/DefinitionField";

const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const initialState = {
  query: "",
  currentWord: null,
  isLoading: false,
  error: null,
  definition: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_CURRENT_WORD":
      return { ...state, currentWord: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_DEFINITION":
      return { ...state, definition: action.payload };
    case "CLEAR_INPUT":
      return { ...state, query: "" };
    default:
      return state;
  }
}

function App() {
  const [{ query, currentWord, isLoading, error, definition }, dispatch] =
    useReducer(reducer, initialState);
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const { queryParam } = useParams();

  const handleDefinition = useCallback(
    async (word) => {
      if (word.trim() === "") {
        alert("Enter a word.");
        return;
      }

      if (word === currentWord) {
        dispatch({ type: "CLEAR_INPUT" });
        return;
      }

      dispatch({ type: "SET_CURRENT_WORD", payload: word });
      dispatch({ type: "CLEAR_INPUT" });
      dispatch({ type: "SET_ERROR", payload: null });
      dispatch({ type: "SET_LOADING", payload: true });
      navigate(`/${word.toLowerCase()}`);

      try {
        const res = await fetch(`${BASE_URL}${word}`);
        if (!res.ok) {
          throw new Error("No Definitions Found");
        }
        const [data] = await res.json();
        dispatch({ type: "SET_DEFINITION", payload: data });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
        inputEl.current?.focus();
      }
    },
    [currentWord, navigate]
  );

  // Effects
  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  useEffect(() => {
    function callBack(e) {
      if (e.key === "Enter") {
        inputEl.current?.focus();
      }
    }

    document.addEventListener("keydown", callBack);
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (query.trim().toLowerCase() === currentWord?.toLowerCase()) {
        dispatch({ type: "CLEAR_INPUT" });
        return;
      }

      if (query) {
        handleDefinition(query);
      } else {
        alert("Enter a word");
      }
    }
  }

  useEffect(() => {
    if (queryParam) {
      handleDefinition(queryParam);
    }
  }, [queryParam, handleDefinition]);

  useEffect(() => {
    if (currentWord) {
      const capitalizedWord =
        currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
      document.title = `Word Lookup: ${capitalizedWord}`;
    }
  }, [currentWord]);

  return (
    <div className="App">
      <InputField
        query={query}
        inputEl={inputEl}
        setQuery={(value) => dispatch({ type: "SET_QUERY", payload: value })}
        clearInput={() => dispatch({ type: "CLEAR_INPUT" })}
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
