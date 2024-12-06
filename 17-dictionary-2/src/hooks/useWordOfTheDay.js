import { useEffect, useState } from "react";
import { getToday, wordList } from "../utils/helpers";

function useWordOfTheDay() {
  const [randomWord, setRandomWord] = useState(null);

  useEffect(() => {
    const today = getToday();
    const lastRunDate = localStorage.getItem("date");
    const previousWord = localStorage.getItem("wordOfTheDay");

    if (today !== lastRunDate) {
      let newWord;
      do {
        newWord = wordList[Math.floor(Math.random() * wordList.length)];
      } while (newWord === previousWord);
      setRandomWord(newWord);
      localStorage.setItem("wordOfTheDay", newWord);
      // localStorage.setItem("date", today); // This line was causing conflicts with the useSearchHistory hook, which also manages the 'date' key in localStorage.
    } else {
      const storedWord = localStorage.getItem("wordOfTheDay");
      setRandomWord(storedWord);
    }
  }, []);

  return { randomWord };
}

export default useWordOfTheDay;
