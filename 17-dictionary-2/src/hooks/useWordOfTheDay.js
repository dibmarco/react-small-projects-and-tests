import { useEffect, useState } from "react";
import { getToday, wordList } from "../utils/helpers";

function useWordOfTheDay() {
  const [randomWord, setRandomWord] = useState(null);

  useEffect(() => {
    const today = getToday();
    const lastRunDate = localStorage.getItem("date");
    const previousWord = localStorage.getItem("randomWord");

    if (today !== lastRunDate) {
      let newWord;
      do {
        newWord = wordList[Math.floor(Math.random() * wordList.length)];
      } while (newWord === previousWord);
      setRandomWord(newWord);
      localStorage.setItem("date", today);
      localStorage.setItem("randomWord", newWord);
    } else {
      const storedWord = localStorage.getItem("randomWord");
      setRandomWord(storedWord);
    }
  }, []);

  return randomWord;
}

export default useWordOfTheDay;
