import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const toastOptions = {
  message: "Please type a word!",
  style: {
    marginTop: "3rem",
    backgroundColor: "#f5f5f5",
    color: "#374151",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
    fontFamily: "'Nunito', sans-serif",
    textAlign: "center",
  },
  duration: 1500,
  icon: (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "24px",
        height: "24px",
        fontSize: "18px",
      }}
    >
      ⚠️
    </span>
  ),
};

// Usage example:
toast.error(toastOptions.message, {
  style: toastOptions.style,
  duration: toastOptions.duration,
  icon: toastOptions.icon,
});

function useQuery(initialValue = "") {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  function navigateToWord(word) {
    const searchQuery = word || query;
    if (!searchQuery.trim()) {
      toast.error(toastOptions.message, {
        style: toastOptions.style,
        duration: toastOptions.duration,
        icon: toastOptions.icon,
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
        icon: toastOptions.icon,
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
