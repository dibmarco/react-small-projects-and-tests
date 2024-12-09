import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { PartOfSpeech } from "./PartOfSpeech";
import useFetchDefinition from "../hooks/useFetchDefinition";
import { shareWord } from "../utils/helpers";
import toast from "react-hot-toast";

function DefinitionField() {
  const { wordToFetch } = useParams();
  const { word, isLoading, error } = useFetchDefinition(wordToFetch);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error("Oops! Word not found.", {
        duration: 2500,
        className: "mt-12 bg-gray-700 text-red-500 p-4 rounded shadow-lg",
      });
      navigate("/"); // Navigate to the root path on error
    }
  }, [error, navigate]);

  return (
    <div className="pl-1 scrollbar-thin pr-1.5 mb-4">
      {isLoading && <Spinner />}
      {/* {error && <p>Error: {error}</p>} */}
      {word && !error && !isLoading && (
        <div className="animate-in md:ml-5" key={word.word}>
          <div className="flex gap-3 my-2">
            <h1 className="font-bold uppercase text-xl items-center justify-center">
              {word.word}
            </h1>
            <p className="text-sm md:text-base pt-1.5 md:pt-1">
              {word.phonetic}
            </p>
            <p
              className="pt-1 cursor-pointer text-lg text-slate-900 hover:text-slate-700"
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
