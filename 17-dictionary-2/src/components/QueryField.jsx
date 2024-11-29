import useQuery from "../hooks/useQuery";

export function QueryField({ inputEl }) {
  const { query, setQuery, navigateToWord, handleKeyPress } = useQuery();

  return (
    <div className="flex items-center justify-center gap-1 mt-3 w-[350px] mx-auto md:w-[600px] mb-2">
      <input
        className="border py-1 px-2.5 w-[300px] md:w-[400px] rounded-md"
        type="text"
        value={query}
        ref={inputEl}
        placeholder="Enter a word"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="border py-1 px-3 bg-slate-300 rounded-md"
        onClick={() => navigateToWord()}
      >
        Search
      </button>
    </div>
  );
}
