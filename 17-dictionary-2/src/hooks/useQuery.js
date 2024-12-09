import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const toastOptions = {
  message: "Please type a word!",
  style: {
    marginTop: "3rem",
    backgroundColor: "#FEF08A", // Equivalent to bg-yellow-200
    color: "#000",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem", // Equivalent to rounded-md
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Equivalent to shadow-lg
  },
  duration: 1500,
};

function useQuery(initialValue = "") {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  function navigateToWord(word) {
    const searchQuery = word || query;
    if (!searchQuery.trim()) {
      toast.error(toastOptions.message, {
        style: toastOptions.style,
        duration: toastOptions.duration,
      });
      return;
    }

    navigate(`/${searchQuery.toLowerCase()}`);
    setQuery("");
  }

  function handleKeyPress(e) {
    if (e.key !== "Enter") return;

    if (!query.trim()) {
      toast.error(toastOptions.message, {
        style: toastOptions.style,
        duration: toastOptions.duration,
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
