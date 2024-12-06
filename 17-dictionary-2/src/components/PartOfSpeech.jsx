export function PartOfSpeech({ meaning }) {
  return (
    <div key={meaning.partOfSpeech}>
      <h2 className="font-bold capitalize">{meaning.partOfSpeech}</h2>
      <ul className="mb-3 mt-1 list-disc pl-[18px]">
        {meaning.definitions.map((definition, i) => (
          <div key={i}>
          <li className="w-[320px] sm:w-[400px] md:w-[500px]">{definition.definition}</li>
          {definition.example && <p className="text-sm pl-3 pr-4 pt-1.5 pb-2 mt-1 mb-2 text-justify text-slate-800 bg-slate-200 max-w-[480px] w-full sm:w-[400px] md:w-[500px] md:ml-3 md:pl-5 rounded-md md:text-base">{definition.example}</p>}
          </div>
        ))}
      </ul>
    </div>
  );
}
