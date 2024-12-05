import { useEffect, useState } from "react";

import useFetchDefinition from "../hooks/useFetchDefinition";
import useQuery from "../hooks/useQuery";

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

function WordOfTheDay() {
  const [randomWord, setRandomWord] = useState(null);
  const { word, isLoading, error } = useFetchDefinition(randomWord);
  const { navigateToWord } = useQuery();

  // function getToday() {
  //   const today = new Date();
  //   const day = String(today.getDate()).padStart(2, "0");
  //   const month = String(today.getMonth() + 1).padStart(2, "0");
  //   const year = today.getFullYear();

  //   return `${year}-${month}-${day}`;
  // }

  useEffect(() => {
    const selectedRandomWord =
      interestingWords[Math.floor(Math.random() * interestingWords.length)];
    // console.log(selectedRandomWord);
    setRandomWord(selectedRandomWord);

    const capitalizedWord =
      selectedRandomWord.charAt(0).toUpperCase() + selectedRandomWord.slice(1);
    document.title = `Word Lookup: ${capitalizedWord}`;
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full flex-col">
      <h1 className="font-bold text-2xl">Word Lookup!</h1>
      <h2
        className="capitalize mt-5 text-xl font-semibold hover:underline cursor-pointer"
        onClick={() => navigateToWord(randomWord)}
      >
        {randomWord}
      </h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading &&
        !error &&
        word &&
        word.meanings &&
        word.meanings[0].definitions && (
          <p>{word.meanings[0].definitions[0].definition}</p>
        )}
    </div>
  );
}

export default WordOfTheDay;
