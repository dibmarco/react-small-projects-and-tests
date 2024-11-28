import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import { QueryField } from "./components/QueryField";
import { DefinitionField } from "./components/DefinitionField";

import useSearchHistory from "./hooks/useSearchHistory";

function App() {
  const inputEl = useRef(null);
  const { searchedWords } = useSearchHistory();

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

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
