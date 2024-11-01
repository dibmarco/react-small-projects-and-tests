export function InputField({
  query,
  queryRef,
  setQuery,
  handleKeyDown,
  handleDefinition,
}) {
  return (
    <div className="input-field">
      <input
        type="text"
        spellCheck={true}
        value={query}
        placeholder="Enter a word"
        ref={queryRef}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button onClick={() => handleDefinition(query.toLocaleLowerCase())}>
        Search
      </button>
    </div>
  );
}
