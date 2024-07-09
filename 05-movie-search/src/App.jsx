import { useState, useEffect } from "react";

const key = "48e806e1";

function App() {
  const [primaryMovie, setPrimaryMovie] = useState({});
  const [movieQuery, setMovieQuery] = useState({});

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&s=back to the future`
      );
      const data = await response.json();
      console.log(data);

      const primaryResult = data.Search[0];
      console.log(primaryResult);

      setPrimaryMovie(primaryResult);
      setMovieQuery(data);
    }

    fetchMovies();
  }, []);

  return (
    <>
      <div>
        <input type="text" />
        <button>Search</button>
        <p>Results: {movieQuery.totalResults}</p>
      </div>
      <p>
        <em>Primary Result</em>
      </p>
      <div>
        <p>Title: {primaryMovie.Title} | {primaryMovie.Year}</p>
        <img src={primaryMovie.Poster} alt="movie poster" />
      </div>
    </>
  );
}

export default App;
