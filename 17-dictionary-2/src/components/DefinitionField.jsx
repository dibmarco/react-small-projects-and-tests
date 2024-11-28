import { useParams } from "react-router-dom";
import useFetchDefinition from "../hooks/useFetchDefinition";

export function DefinitionField() {
  const { wordToFetch } = useParams();
  const { word, isLoading, error } = useFetchDefinition(wordToFetch);

  return (
    <div className="mb-3">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {word && (
        <>
          <h1 className="font-bold uppercase text-xl">{word.word}</h1>
          {word.meanings.map((meaning) => (
            <div key={meaning.partOfSpeech}>
              <h2 className="font-bold capitalize">{meaning.partOfSpeech}</h2>
              <ul>
                {meaning.definitions.map((definition) => (
                  <li key={definition.definition}>{definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
