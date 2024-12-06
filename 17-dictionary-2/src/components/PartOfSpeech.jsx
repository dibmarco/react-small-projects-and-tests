import { useNavigate } from "react-router-dom";

export function PartOfSpeech({ meaning }) {
  const navigate = useNavigate();

  function handleDoubleClick(word) {
    navigate(`/${word}`);
  }

  function renderText(definition) {
    // Regular expression to remove non-alphabetic characters from the beginning and end
    const cleanWord = (word) => word.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "");

    // Split the definition into words and wrap each word in a span
    const words = definition.split(" ");
    return words.map((word, i) => {
      const cleanedWord = cleanWord(word);
      return (
        <span key={i} onDoubleClick={() => handleDoubleClick(cleanedWord)}>
          {word}{" "}
        </span>
      );
    });
  }

  return (
    <div key={meaning.partOfSpeech}>
      <h2 className="font-bold capitalize">{meaning.partOfSpeech}</h2>
      <ul className="mb-3 mt-1 list-disc pl-[18px]">
        {meaning.definitions.map((definition, i) => (
          <div key={i}>
            <li className="w-[320px] sm:w-[400px] md:w-[500px]">
              {renderText(definition.definition)}
            </li>
            {definition.example && (
              <p className="text-sm pl-3 pr-4 pt-1.5 pb-2 mt-1 mb-2 text-justify text-slate-800 bg-slate-200 max-w-[480px] w-full sm:w-[400px] md:w-[500px] md:ml-4 md:pl-5 rounded-md md:text-base">
                {renderText(definition.example)}
              </p>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
