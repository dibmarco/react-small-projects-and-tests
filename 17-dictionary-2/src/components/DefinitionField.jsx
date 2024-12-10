import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { PartOfSpeech } from "./PartOfSpeech";
import useFetchDefinition from "../hooks/useFetchDefinition";
import { shareWord } from "../utils/helpers";
import NotFound from "./NotFound";

function DefinitionField({ focusInput }) {
  const { wordToFetch } = useParams();
  const { word, isLoading, error } = useFetchDefinition(wordToFetch);

  return (
    <div className="pl-1 scrollbar-thin pr-1.5 mb-4">
      {isLoading && <Spinner />}
      {error && <NotFound focusInput={focusInput} />}
      {word && !error && !isLoading && (
        <div className="animate-in md:ml-5" key={word.word}>
          <div className="flex gap-3 my-1">
            <h1 className="font-extrabold tracking-wide uppercase text-xl items-center justify-center pt-[1.8px]">
              {word.word}
            </h1>
            <p className="text-sm md:text-base pt-1.5 md:pt-1">
              {word.phonetic}
            </p>
            <p
              className="pt-[1.8px] cursor-pointer text-lg text-slate-900 hover:text-slate-700"
              onClick={() => shareWord(wordToFetch)}
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
