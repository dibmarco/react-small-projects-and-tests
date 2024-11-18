import { useContext } from "react";
import MovieContext from "../context/MovieContext";

export function PrimaryResult() {
  const { isLoading, primaryMovie, primaryMovieData, handleIMDbPage } = useContext(MovieContext);

  return isLoading ? (
    <div className="spinner"></div>
  ) : (
    <div className="primary-result animate-in">
      <p>
        <strong>Primary Result</strong>
      </p>
      <div className="primary-details">
        <p>
          <strong>{primaryMovie.Title}</strong> | {primaryMovie.Year} |{" "}
          {primaryMovieData.Runtime} | IMDB Rating: {primaryMovieData.imdbRating}
        </p>
        <img
          src={primaryMovie.Poster}
          alt="movie poster"
          onClick={handleIMDbPage}
        />
        <p>
          <span>Director:</span> {primaryMovieData.Director}
        </p>
        <p>
          <span>Featuring:</span> {primaryMovieData.Actors}
        </p>
        <p>
          <span>Summary:</span> {primaryMovieData.Plot}
        </p>
      </div>
    </div>
  );
}
