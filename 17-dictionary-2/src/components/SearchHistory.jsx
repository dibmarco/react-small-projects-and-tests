import { useState } from "react";
import useQuery from "../hooks/useQuery";

function SearchHistory({ previousSearches }) {
  const [showMore, setShowMore] = useState(false);
  const { navigateToWord } = useQuery();

  const displayLimit = 5;
  const wordsToShow = showMore
    ? previousSearches
    : previousSearches.slice(0, displayLimit);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:max-w-[350px] md:max-w-[600px] mt-3">
      <p className="font-semibold min-w-fit">
        Search History ({previousSearches.length}):
      </p>
      <ul className="flex flex-wrap max-w-full sm:max-w-[calc(100%-4rem)] md:max-w-[calc(600px-4rem)]">
        {wordsToShow.map((word) => (
          <li
            className="capitalize border-r-2 inline-block mx-0.5 px-1.5 cursor-pointer last:border-r-0"
            onClick={() => navigateToWord(word)}
            key={word}
          >
            {word}
          </li>
        ))}
        {previousSearches.length > displayLimit && (
          <p
            onClick={() => setShowMore(!showMore)}
            className="cursor-pointer text-blue-500 hover:underline pl-1.5"
          >
            {showMore ? "Less" : "More"}
          </p>
        )}
      </ul>
    </div>
  );
}

export default SearchHistory;
