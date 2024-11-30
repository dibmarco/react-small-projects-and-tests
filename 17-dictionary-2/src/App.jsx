import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import { QueryField } from "./components/QueryField";
import { DefinitionField } from "./components/DefinitionField";

import useSearchHistory from "./hooks/useSearchHistory";
import SearchHistory from "./components/SearchHistory";
import WordOfTheDay from "./components/WordOfTheDay";

function App() {
  const inputEl = useRef(null);
  const { previousSearches } = useSearchHistory();

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  return (
    <div className="App font-nunito grid grid-rows-[auto_1fr_auto] h-screen mx-auto px-3.5 sm:px-0 sm:w-[500px] md:w-[600px]">
      <div className="row-start-1 row-end-2">
        <QueryField inputEl={inputEl} />
      </div>
      <div className="row-start-2 row-end-3 overflow-y-auto scrollbar-thin">
        <Routes>
          <Route path="/" element={<WordOfTheDay />} />
          <Route path="/:wordToFetch" element={<DefinitionField />} />
        </Routes>
      </div>
      <div className="row-start-3 row-end-4">
        <SearchHistory previousSearches={previousSearches} />
      </div>
    </div>
  );
}

export default App;
