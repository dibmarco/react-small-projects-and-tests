import { useState, useEffect } from "react";

const key = "48e806e1";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("taxi driver");
  const [primaryMovie, setPrimaryMovie] = useState({});
  const [otherTitles, setOtherTitles] = useState([]);
  const [movieResults, setMovieResults] = useState({});
  const [imdbId, setImdbId] = useState("");
  const [primaryMovieData, setPrimaryMovieData] = useState({});

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&s=${query}`
      );
      const data = await response.json();
      // console.log(data);

      const primaryResult = data.Search[0];
      // console.log(primaryResult);

      const titles = data.Search;
      // console.log(titles);

      const getTitles = function (movies) {
        return movies.map((movie) => movie.Title);
      };

      const additionalTitles = getTitles(titles);
      // console.log(additionalTitles);

      setOtherTitles(additionalTitles);
      setPrimaryMovie(primaryResult);
      setImdbId(primaryResult.imdbID);
      setMovieResults(data);
    }

    fetchMovies();
  }, [query]);

  useEffect(() => {
    async function fetchPrimaryMovie() {
      if (imdbId) {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${imdbId}`
        );
        const data = await response.json();
        // console.log(data);

        setPrimaryMovieData(data);
      }
    }

    fetchPrimaryMovie();
  }, [imdbId]);

  function handleSearch() {
    setQuery(inputValue);
  }

  return (
    <div className="app-container">
      <div className="query-field">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <p>
          <em>Results: {movieResults.totalResults}</em>
        </p>
      </div>
      <div className="query-results">
        <div className="general-results">
          <p>Other titles including your query:</p>
          <ul>
            {otherTitles.map((title, i) => (
              <li key={i}>{title}</li>
            ))}
          </ul>
        </div>
        <div className="primary-result">
          <p>
            <strong>Primary Result</strong>
          </p>
          <div className="primary-details">
            <p>
              Title: {primaryMovie.Title} | {primaryMovie.Year} |{" "}
              {primaryMovieData.Runtime} | IMDB Rating:{" "}
              {primaryMovieData.imdbRating}
            </p>
            <img src={primaryMovie.Poster} alt="movie poster" />
            <p>{primaryMovieData.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
