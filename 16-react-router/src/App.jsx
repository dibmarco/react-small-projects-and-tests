import { useState } from "react";
import {
  Routes,
  Route,
  // NavLink,
  useParams,
  useNavigate,
} from "react-router-dom";

function App() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSearch(word) {
    navigate(`/${word}`);
  }

  return (
    <div className="App">
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <button
        onClick={() => {
          handleSearch(query);
          setQuery("");
        }}
      >
        Search
      </button>
      {/* <h1>Hello</h1>
        <NavLink to="1">Page 1</NavLink>
        <NavLink to="2">Page 2</NavLink>
        <NavLink to="whatever">Page Whatever</NavLink> */}
      <Routes>
        <Route path="/:word" element={<NewPage />} />
      </Routes>
    </div>
  );
}

function NewPage() {
  const { word } = useParams();
  console.log(word);

  return <p>The word is: {word}</p>;
}

export default App;
