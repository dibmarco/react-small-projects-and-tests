import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useQuery(initialValue = "") {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  function navigateToWord(word) {
    const searchQuery = word || query;
    if (!searchQuery.trim()) {
      alert("Enter a word!");
      return;
    }

    navigate(`/${searchQuery.toLowerCase()}`);
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
