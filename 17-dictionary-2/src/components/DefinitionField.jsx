import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import useFetchDefinition from "../hooks/useFetchDefinition";

export function DefinitionField() {
  const { wordToFetch } = useParams();
  const { word, isLoading, error } = useFetchDefinition(wordToFetch);

  return (
    <div className="pl-1 scrollbar-thin pr-1.5 mb-4">
      {isLoading && <Spinner />}
      {error && <p>Error: {error}</p>}
      {word && !error && !isLoading && (
        <div className="animate-in">
          <h1 className="font-bold uppercase text-xl my-2">{word.word}</h1>
          {word.meanings.map((meaning, i) => (
            <div key={i}>
              <h2 className="font-bold capitalize">{meaning.partOfSpeech}</h2>
              <ul className="mb-3 mt-1 list-disc pl-[18px]">
                {meaning.definitions.map((definition, i) => (
                  <li key={i}>{definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
