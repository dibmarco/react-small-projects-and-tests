import useQuery from "../hooks/useQuery";

export function QueryField({ inputEl }) {
  const { query, setQuery, navigateToWord, handleKeyPress } = useQuery();

  return (
    <div className="text-center mt-3">
      <input
        className="border p-1"
        type="text"
        value={query}
        ref={inputEl}
        placeholder="Enter a word"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="border p-1 bg-slate-300" onClick={navigateToWord}>Search</button>
    </div>
  );
}
