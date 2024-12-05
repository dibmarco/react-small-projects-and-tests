import { useEffect, useState } from "react";

// import Spinner from "./Spinner";

import useFetchDefinition from "../hooks/useFetchDefinition";
import useQuery from "../hooks/useQuery";

import { getToday } from "../utils/helpers";

const interestingWords = [
  "serendipity",
  "luminous",
  "euphoria",
  "ephemeral",
  "ineffable",
  "solitude",
  "mellifluous",
  "labyrinthine",
  "eloquent",
  "iridescent",
  "tranquility",
  "resonance",
  "effervescent",
  "aesthetic",
  "nebulous",
  "paradox",
  "luminescence",
  "alchemy",
  "zephyr",
  "reverie",
  "zenith",
  "ubiquitous",
  "wanderlust",
  "ameliorate",
  "rhapsody",
  "resilience",
  "synergy",
  "elation",
  "incandescent",
  "perennial",
];
const isWod = true;

function WordOfTheDay() {
  const [randomWord, setRandomWord] = useState(null);
  const { word, isLoading, error } = useFetchDefinition(randomWord, isWod);
  const { navigateToWord } = useQuery();

  useEffect(() => {
    const today = getToday();
    const lastRunDate = localStorage.getItem("date");

    if (today !== lastRunDate) {
      const selectedRandomWord =
        interestingWords[Math.floor(Math.random() * interestingWords.length)];
      setRandomWord(selectedRandomWord);
      localStorage.setItem("date", today);
      localStorage.setItem("randomWord", selectedRandomWord);
    } else {
      const storedWord = localStorage.getItem("randomWord");
      setRandomWord(storedWord);
    }

    if (randomWord) {
      const capitalizedWord =
        randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
      document.title = `Word Lookup: ${capitalizedWord}`;
    }
  }, [randomWord]);

  return (
    <div className="flex justify-center items-center h-full w-full flex-col">
      <div className="flex justify-center items-center flex-col sm:flex-row sm:gap-1">
        <p className="font-bold text-xl">Word of the Day:</p>
        <p className="font-thin text-lg sm:mt-1">{getToday()}</p>
      </div>
      <div className="w-[340px] text-center sm:w-[500px]">
        <h1 className="capitalize mt-8 text-3xl font-semibold">{randomWord}</h1>
        {/* {isLoading && <Spinner />} */}
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        {!isLoading &&
          !error &&
          word &&
          word.meanings &&
          word.meanings[0].definitions && (
            <>
              <p className="text-lg mt-2 leading-tight">
                {word.meanings[0].definitions[0].definition}
              </p>
              <p
                className="text-blue-500 hover:underline cursor-pointer text-sm mt-3"
                onClick={() => navigateToWord(randomWord)}
              >
                Read full definition
              </p>
            </>
          )}
      </div>
    </div>
  );
}

export default WordOfTheDay;
