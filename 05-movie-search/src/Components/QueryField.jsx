export function QueryField({
  inputValue,
  setInputValue,
  onHandleSearch,
  movieResults,
  error,
}) {
  return (
    <div className="query-field">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={onHandleSearch}>Search</button>
      {error ? (
        <p style={{color: "red"}}>
          <strong>Invalid query. Try again.</strong>
        </p>
      ) : (
        <p>
          <em>Total Results: {movieResults.totalResults}</em>
        </p>
      )}
    </div>
  );
}
