import useQuery from "../hooks/useQuery";

function Synonyms({ synonyms }) {
  const { navigateToWord } = useQuery();

  if (!synonyms.length) return null;

  return (
    <div className="flex flex-wrap gap-1 leading-4 text-sm pl-3 pr-4 pt-1.5 pb-2 mt-1 mb-2 text-justify text-slate-800 bg-blue-100 max-w-[480px] w-full md:ml-4 md:pl-5 rounded-md md:text-base sm:max-w-[400px] md:max-w-[480px]">
      <p className="font-semibold">
        {synonyms.length > 1 ? "Synonyms" : "Synonym"}:
      </p>
      {synonyms.map((synonym, i) => (
        <p
          key={i}
          className="capitalize"
          onDoubleClick={() => navigateToWord(synonym)}
        >
          {synonym}
          {i < synonyms.length - 1 ? "," : "."}
        </p>
      ))}
    </div>
  );
}

export default Synonyms;
