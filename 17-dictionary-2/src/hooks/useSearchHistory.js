import { useState, useEffect } from "react";

function useSearchHistory() {
  const [previousSearches, setPreviousSearches] = useState([]);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("previousSearches")) || [];
    setPreviousSearches(storedHistory);

    // Event listener for storage changes
    function handleStorageChange() {
      const updatedHistory =
        JSON.parse(localStorage.getItem("previousSearches")) || [];
      setPreviousSearches(updatedHistory);
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { previousSearches };
}

export default useSearchHistory;
