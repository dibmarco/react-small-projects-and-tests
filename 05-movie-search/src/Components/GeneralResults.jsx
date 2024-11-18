import { useState, useEffect, useContext } from "react";
import MovieContext from "../context/MovieContext";

export function GeneralResults() {
  const { otherTitles, handleTitleClick } = useContext(MovieContext);
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
          <li key={i} value={title} onClick={() => handleTitleClick(title)}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
