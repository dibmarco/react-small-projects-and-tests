import useQuery from "../hooks/useQuery";

function Antonyms({ antonyms }) {
  const { navigateToWord } = useQuery();

  if (!antonyms.length) return null;

  return (
    <div className="flex flex-wrap gap-x-1 text-sm pl-3 pr-4 pt-1.5 pb-2 mt-1 mb-2 text-slate-800 bg-red-100 max-w-[480px] w-full md:ml-4 md:pl-5 rounded-md md:text-base sm:max-w-[400px] md:max-w-[480px]">
      <p className="font-semibold">
        {antonyms.length > 1 ? "Antonyms" : "Antonym"}:
      </p>
      {antonyms.map((antonym, i) => (
        <p
          key={i}
          className="capitalize"
          onDoubleClick={() => navigateToWord(antonym)}
        >
          {antonym}
          {i < antonyms.length - 1 ? "," : "."}
        </p>
      ))}
    </div>
  );
}

export default Antonyms;
