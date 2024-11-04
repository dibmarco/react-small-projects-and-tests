function InputField({
  query,
  inputEl,
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
        ref={inputEl}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button
        onClick={() => {
          if (query.toLowerCase() === currentWord) {
            clearInput();
            inputEl.current?.focus();
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
