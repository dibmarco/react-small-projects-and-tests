function InputField({
  query,
  queryRef,
  setQuery,
  currentWord,
  handleKeyDown,
  handleDefinition,
  clearInput,
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
          if (query === currentWord) {
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
