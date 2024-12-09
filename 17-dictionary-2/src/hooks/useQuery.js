import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useQuery(initialValue = "") {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  function navigateToWord(word) {
    const searchQuery = word || query;
    if (!searchQuery.trim()) {
      toast.error("Please type a word!", {
        className:
          "mt-12 bg-yellow-200 text-black px-4 py-2 rounded-md shadow-lg",
        duration: 1500,
      });
      return;
    }

    navigate(`/${searchQuery.toLowerCase()}`);
    setQuery("");
  }

  function handleKeyPress(e) {
    if (e.key !== "Enter") return;

    if (!query.trim()) {
      toast.error("Please type a word!", {
        className:
          "mt-12 bg-yellow-200 text-black px-4 py-2 rounded-md shadow-lg",
        duration: 1500,
      });
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
