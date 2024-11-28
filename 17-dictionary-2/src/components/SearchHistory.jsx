import useQuery from "../hooks/useQuery";

function SearchHistory({ searchedWords }) {
  const { navigateToWord } = useQuery();

  return (
    <div className="flex gap-1">
      <p className="font-semibold">Search History:</p>
      <ul>
        {searchedWords.map((word) => (
          <li
            className="capitalize border-r-2 inline-block mx-0.5 px-1.5 cursor-pointer"
            onClick={() => navigateToWord(word)}
            key={word}
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
