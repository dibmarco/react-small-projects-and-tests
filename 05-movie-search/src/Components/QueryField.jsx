export function QueryField({
  inputValue,
  setInputValue,
  onHandleSearch,
  movieResults,
  error,
  onKeyDown,
}) {
  return (
    <div className="query-field">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button onClick={onHandleSearch}>
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      {error ? (
        <p style={{ color: "red" }}>
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
