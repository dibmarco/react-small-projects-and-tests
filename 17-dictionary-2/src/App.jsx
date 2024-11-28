import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import { QueryField } from "./components/QueryField";
import { DefinitionField } from "./components/DefinitionField";

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



export default App;
