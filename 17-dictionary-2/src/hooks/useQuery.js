import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useQuery(initialValue = "") {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  function navigateToWord() {
    if (!query.trim()) {
      alert("Enter a word!");
      return;
    }

    navigate(`/${query.toLowerCase()}`);
    setQuery("");
  }

  function handleKeyPress(e) {
    if (e.key !== "Enter") return;

    if (!query.trim()) {
      alert("Enter a word!");
      return;
    }

    navigateToWord();
  }

  return {
    query,
    setQuery,
    navigateToWord,
    handleKeyPress,
  };
}

export default useQuery;
