import { useState, useEffect } from "react";

const KEY = "48e806e1";
const movieString = "zodiac";

function App() {
  const [movie, setMovie] = useState(null);

  useEffect(
    () =>
      async function getQuote() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${movieString}`
        );
        const data = await res.json();
        // console.log(data);
        const zodiac = await data.Search.at(0);
        setMovie(zodiac);
      },
    []
  );

  console.log(movie);

  return (
    <div>
      <h1>{movie.Title} | {movie.Year}</h1>
      <img src={movie.Poster} alt="zodiac poster" />
    </div>
  );
}

export default App;
