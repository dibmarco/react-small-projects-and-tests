import useQuery from "../hooks/useQuery";

function Antonyms({ antonyms }) {
  const { navigateToWord } = useQuery();

  if (!antonyms.length) return null;

  return (
    <div className="flex gap-1 bg-red-100 py-2 rounded-md mt-2 flex-wrap px-5 mx-5">
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
