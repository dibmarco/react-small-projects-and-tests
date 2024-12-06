import { useState, useEffect } from "react";
import { getToday } from "../utils/helpers";

function useSearchHistory() {
  const [previousSearches, setPreviousSearches] = useState([]);

  useEffect(() => {
    const today = getToday();
    const lastRunDate = localStorage.getItem("date");

    // Reset the search history daily.
    if (today !== lastRunDate) {
      localStorage.removeItem("previousSearches");
      localStorage.setItem("date", today);
    }

    // Retrieve the updated search history from local storage.
    const storedHistory =
      JSON.parse(localStorage.getItem("previousSearches")) || [];
    setPreviousSearches(storedHistory);

    // Event listener for storage changes.
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
