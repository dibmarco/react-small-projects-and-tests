import useQuery from "../hooks/useQuery";

export function QueryField({ inputEl }) {
  const { query, setQuery, navigateToWord, handleKeyPress } = useQuery();

  return (
    <>
      <input
        type="text"
        value={query}
        ref={inputEl}
        placeholder="Enter a word"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={navigateToWord}>Search</button>
    </>
  );
}
