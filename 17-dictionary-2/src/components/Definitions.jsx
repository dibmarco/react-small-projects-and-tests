import useQuery from "../hooks/useQuery";
import { makeWordsClickable } from "../utils/helpers";

function Definitions({ definitions }) {
    const { navigateToWord } = useQuery();

  return (
    <ul className="mb-3 mt-1 list-disc pl-[18px]">
      {definitions.map((definition, i) => (
        <div key={i}>
          <li className="w-[320px] sm:w-[400px] md:w-[500px]">
            {makeWordsClickable(definition.definition, navigateToWord)}
          </li>
          {definition.example && (
            <p className="text-sm pl-3 pr-4 pt-1.5 pb-2 mt-1 mb-2 text-justify text-slate-800 bg-slate-200 max-w-[480px] w-full sm:w-[400px] md:w-[500px] md:ml-4 md:pl-5 rounded-md md:text-base">
              {makeWordsClickable(definition.example, navigateToWord)}
            </p>
          )}
        </div>
      ))}
    </ul>
  );
}

export default Definitions;
