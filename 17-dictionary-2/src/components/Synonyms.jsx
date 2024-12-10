import useQuery from "../hooks/useQuery";

function Synonyms({ synonyms }) {
  const { navigateToWord } = useQuery();

  if (!synonyms.length) return null;

  return (
    <div className="flex gap-1 bg-blue-100 py-2 rounded-md mt-2 flex-wrap px-5 mx-5 mb-2">
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
