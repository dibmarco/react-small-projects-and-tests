function InputField({
  query,
  queryRef,
  setQuery,
  currentWord,
  clearInput,
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
      <button
        onClick={() => {
          if (query.toLowerCase() === currentWord.toLowerCase()) {
            clearInput();
            return;
          }

          handleDefinition(query);
        }}
      >
        Search
      </button>
    </div>
  );
}

export default InputField;
