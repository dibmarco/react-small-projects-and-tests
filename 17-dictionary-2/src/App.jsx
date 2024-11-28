import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { QueryField } from "./components/QueryField";
import { DefinitionField } from "./components/DefinitionField";

function App() {
  const inputEl = useRef(null);
  const [searchedWords, setSearchedWords] = useState([]);
  const location = useLocation();

  // Load search history from localStorage on initial mount
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchedWords")) || [];
    setSearchedWords(storedHistory);
  }, []);

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    if (path) {
      setSearchedWords((prevWords) => {
        // Check if the word already exists in the Search History
        if (
          prevWords.find(
            (repeatedWord) => repeatedWord.toLowerCase() === path.toLowerCase()
          )
        ) {
          return prevWords;
        }
        const updatedWords = [path, ...prevWords];
        // Save updated search history to localStorage
        localStorage.setItem("searchedWords", JSON.stringify(updatedWords));
        return updatedWords;
      });
    }
  }, [location]);

  return (
    <div className="App font-nunito w-[350px] mx-auto md:w-[600px] text-slate-900">
      <QueryField inputEl={inputEl} />
      <Routes>
        <Route
          path="/:wordToFetch"
          element={<DefinitionField searchedWords={searchedWords} />}
        />
      </Routes>
    </div>
  );
}

export default App;
