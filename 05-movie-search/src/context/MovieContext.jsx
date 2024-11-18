import { createContext, useState, useEffect } from "react";

const MovieContext = createContext();

const key = "48e806e1";

export function MovieProvider({ children }) {
  const [inputValue, setInputValue] = useState("The Godfather");
  const [query, setQuery] = useState("the godfather");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movieResults, setMovieResults] = useState({});
  const [primaryMovie, setPrimaryMovie] = useState({});
  const [primaryMovieData, setPrimaryMovieData] = useState({});
  const [otherTitles, setOtherTitles] = useState([]);
  const [imdbId, setImdbId] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${query}`
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
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  useEffect(() => {
    async function fetchPrimaryMovie() {
      if (imdbId) {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${imdbId}`
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

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <MovieContext.Provider
      value={{
        inputValue,
        setInputValue,
        isLoading,
        error,
        movieResults,
        primaryMovie,
        primaryMovieData,
        otherTitles,
        handleSearch,
        handleTitleClick,
        handleIMDbPage,
        handleKeyDown,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContext;
