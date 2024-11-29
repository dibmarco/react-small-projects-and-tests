import { useParams } from "react-router-dom";
import SearchHistory from "./SearchHistory";
import useFetchDefinition from "../hooks/useFetchDefinition";

export function DefinitionField({ previousSearches }) {
  const { wordToFetch } = useParams();
  const { word, isLoading, error } = useFetchDefinition(wordToFetch);

  return (
    <div className="mb-3 h-screen overflow-y-auto pb-16 pl-1 scrollbar-thin">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {word && !error && !isLoading && (
        <>
          <h1 className="font-bold uppercase text-xl mb-3">{word.word}</h1>
          {word.meanings.map((meaning) => (
            <div key={meaning.partOfSpeech}>
              <h2 className="font-bold capitalize">{meaning.partOfSpeech}</h2>
              <ul className="mb-3 mt-1 list-disc pl-[18px]">
                {meaning.definitions.map((definition) => (
                  <li key={definition.definition}>{definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
      {previousSearches.length > 0 && (
        <SearchHistory previousSearches={previousSearches} />
      )}
    </div>
  );
}
