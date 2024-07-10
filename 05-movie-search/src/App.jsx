import { useState, useEffect } from "react";
import { QueryField } from "./Components/QueryField";
import { GeneralResults } from "./Components/GeneralResults";
import { PrimaryResult } from "./Components/PrimaryResult";

const key = "48e806e1";

function App() {
  const [inputValue, setInputValue] = useState("Taxi Driver");
  const [query, setQuery] = useState("taxi driver");
  const [error, setError] = useState(false);
  const [movieResults, setMovieResults] = useState({});
  const [primaryMovie, setPrimaryMovie] = useState({});
  const [primaryMovieData, setPrimaryMovieData] = useState({});
  const [otherTitles, setOtherTitles] = useState([]);
  const [imdbId, setImdbId] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`
        );
        const data = await response.json();
        // console.log(data);

        if (data.Response === "False") {
          setError(true);
        } else {
          setError(false);
        }

        const primaryResult = data.Search[0];
        // console.log(primaryResult);

        const titles = data.Search;
        // console.log(titles);

        const getTitles = function (movies) {
          return movies.map((movie) => movie.Title);
        };

        const additionalTitles = getTitles(titles);
        // console.log(additionalTitles);

        setMovieResults(data);
        setPrimaryMovie(primaryResult);
        setOtherTitles(additionalTitles);
        setImdbId(primaryResult.imdbID);
      } catch (error) {
        console.error(error.message);
      }
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

  function handleTitleClick(title) {
    setInputValue(title);
    setQuery(title);
  }

  function handleIMDbPage() {
    window.open(`https://www.imdb.com/title/${imdbId}`, "_blank");
  }

  return (
    <div className="app-container">
      <QueryField
        inputValue={inputValue}
        setInputValue={setInputValue}
        onHandleSearch={handleSearch}
        movieResults={movieResults}
        error={error}
      />

      <GeneralResults
        otherTitles={otherTitles}
        onHandleTitleClick={handleTitleClick}
      />

      <PrimaryResult
        primaryMovie={primaryMovie}
        primaryMovieData={primaryMovieData}
        onHandleIMDbPage={handleIMDbPage}
      />
    </div>
  );
}

export default App;
