import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

function useSearchHistory() {
  const [previousSearches, setPreviousSearches] = useState([]);
  // const location = useLocation();

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("previousSearches")) || [];
    setPreviousSearches(storedHistory);
  }, []);

  // useEffect(() => {
  //   const path = location.pathname.split("/")[1];
  //   if (path) {
  //     setPreviousSearches((prevWords) => {
  //       if (
  //         prevWords.find(
  //           (repeatedWord) => repeatedWord.toLowerCase() === path.toLowerCase()
  //         )
  //       ) {
  //         return prevWords;
  //       }
  //       const updatedWords = [path, ...prevWords];
  //       localStorage.setItem("previousSearches", JSON.stringify(updatedWords));
  //       return updatedWords;
  //     });
  //   }
  // }, [location]);

  return { previousSearches };
}

export default useSearchHistory;
