import { useEffect } from "react";

import Spinner from "./Spinner";

import useWordOfTheDay from "../hooks/useWordOfTheDay";
import useFetchDefinition from "../hooks/useFetchDefinition";
import useQuery from "../hooks/useQuery";
import useBreakpoint from "../hooks/useBreakPoint";

import { getToday, makeWordsClickable } from "../utils/helpers";

const isWod = true;

function WordOfTheDay() {
  const { randomWord } = useWordOfTheDay();
  const { word, isLoading, error } = useFetchDefinition(randomWord, isWod);
  const { navigateToWord } = useQuery();
  const isSmallScreen = useBreakpoint();

  useEffect(() => {
    if (randomWord) {
      const capitalizedWord =
        randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
      document.title = `Word Lookup: ${capitalizedWord}`;
    }
  }, [randomWord]);

  return (
    <div className="animate-in flex justify-center items-center h-full w-full flex-col">
      <div className="flex justify-center items-center flex-col sm:flex-row sm:gap-1">
        <p className="font-bold text-xl">
          {makeWordsClickable("Word of the Day:", navigateToWord)}
        </p>
        <p className="font-thin text-lg sm:mt-1">
          {makeWordsClickable(getToday(), navigateToWord)}
        </p>
      </div>
      <div className="w-[340px] text-center sm:w-[500px]">
        <h1
          className="capitalize mt-10 text-3xl font-semibold"
          onDoubleClick={() => navigateToWord(randomWord)}
        >
          {randomWord}
        </h1>
        {word && word.phonetic && (
          <p className="text-base mb-0.5">{word.phonetic}</p>
        )}
        {isLoading && <Spinner type="small" />}
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        {!isLoading &&
          !error &&
          word &&
          word.meanings &&
          word.meanings[0].definitions && (
            <>
              <p className="text-lg mt-2 leading-tight">
                {makeWordsClickable(
                  word.meanings[0].definitions[0].definition,
                  navigateToWord
                )}
              </p>
              <p
                className="text-blue-500 hover:underline cursor-pointer text-sm mt-3"
                onClick={() => navigateToWord(randomWord)}
              >
                Read full definition
              </p>
            </>
          )}
        <p className="text-xs mt-16 text-gray-500 sm:text-sm">
          <span className="pr-1.5 animate-pulse">
            <i className="fa-solid fa-hand-pointer"></i>
          </span>
          {makeWordsClickable(
            `Double-${
              isSmallScreen ? "tap" : "click"
            } any word on screen for definition.`,
            navigateToWord
          )}
        </p>
      </div>
    </div>
  );
}

export default WordOfTheDay;
