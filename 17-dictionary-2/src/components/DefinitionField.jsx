import { useParams } from "react-router-dom";

import Spinner from "./Spinner";
import { PartOfSpeech } from "./PartOfSpeech";

import useFetchDefinition from "../hooks/useFetchDefinition";

import { capitalizeWord } from "../utils/helpers";

function DefinitionField() {
  const { wordToFetch } = useParams();
  const { word, isLoading, error } = useFetchDefinition(wordToFetch);

  const shareWord = {
    title: "Word Looup App",
    text: `Word Lookup: ${capitalizeWord(wordToFetch)}`,
    // url: `https://word-lookup-md.netlify.app/${wordToFetch}`,
    url: window.location.href,
  };

  async function handleShareWord() {
    try {
      await navigator.share(shareWord);
    } catch (err) {
      console.error("Failed sharing word.", err);
    }
  }

  return (
    <div className="pl-1 scrollbar-thin pr-1.5 mb-4">
      {isLoading && <Spinner />}
      {error && <p>Error: {error}</p>}
      {word && !error && !isLoading && (
        <div className="animate-in md:ml-5">
          <div className="flex gap-3 my-2">
            <h1 className="font-bold uppercase text-xl items-center justify-center">
              {word.word}
            </h1>
            <p className="text-sm md:text-base pt-1.5 md:pt-1">
              {word.phonetic}
            </p>
            <p
              className="pt-1 cursor-pointer text-lg text-slate-900 hover:text-slate-700"
              onClick={handleShareWord}
            >
              <i className="fa-solid fa-share-nodes"></i>
            </p>
          </div>
          {word.meanings.map((meaning, i) => (
            <PartOfSpeech key={i} meaning={meaning} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DefinitionField;
