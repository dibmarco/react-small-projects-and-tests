import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function useSearchHistory() {
  const [searchedWords, setSearchedWords] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchedWords")) || [];
    setSearchedWords(storedHistory);
  }, []);

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    if (path) {
      setSearchedWords((prevWords) => {
        if (
          prevWords.find(
            (repeatedWord) => repeatedWord.toLowerCase() === path.toLowerCase()
          )
        ) {
          return prevWords;
        }
        const updatedWords = [path, ...prevWords];
        localStorage.setItem("searchedWords", JSON.stringify(updatedWords));
        return updatedWords;
      });
    }
  }, [location]);

  return { searchedWords };
}

export default useSearchHistory;
