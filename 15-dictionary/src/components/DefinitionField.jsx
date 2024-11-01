export function DefinitionField({
  isLoading,
  error,
  definition,
  handleDefinition,
}) {
  return (
    <div className="definition-field">
      {isLoading && (
        <div className="loading">
          <p>Searching...</p>
        </div>
      )}
      {!isLoading && error && (
        <div className="error-message">
          <p>{error.message}</p>
        </div>
      )}
      {!isLoading && !error && definition && (
        <div className="definition">
          <p style={{ fontWeight: "600" }}>{definition.word.toUpperCase()}</p>
          <p>{definition.phonetic}</p>
          {definition.meanings.map((meaning, i) => (
            <div key={i}>
              <p style={{ fontWeight: "600", marginTop: "10px" }}>
                {meaning.partOfSpeech}
              </p>
              <ul>
                {meaning.definitions.map((def, j) => (
                  <li key={j}>{def.definition}</li>
                ))}
              </ul>
              {meaning.synonyms.length > 0 && (
                <p>
                  Synonyms:{" "}
                  {meaning.synonyms.map((synonym) => (
                    <span
                      key={synonym}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDefinition(synonym)}
                    >
                      {synonym}
                      {" / "}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
