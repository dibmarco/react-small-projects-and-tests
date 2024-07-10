export function QueryField({
  inputValue,
  setInputValue,
  movieResults,
  onHandleSearch,
}) {
  return (
    <div className="query-field">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={onHandleSearch}>Search</button>
      <p>
        <em>Total Results: {movieResults.totalResults}</em>
      </p>
    </div>
  );
}
