import { useState, useEffect } from "react";

export function GeneralResults({ otherTitles, onHandleTitleClick }) {
  const [listResults, setListResults] = useState(0);

  useEffect(() => {
    setListResults(otherTitles.length);
  }, [otherTitles]);

  return (
    <div className="general-results">
      <p>
        Other {listResults} {listResults <= 1 ? "title" : "titles"} including
        your query:
      </p>
      <ul>
        {otherTitles.map((title, i) => (
          <li key={i} value={title} onClick={() => onHandleTitleClick(title)}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
