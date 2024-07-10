export function PrimaryResult({
  primaryMovie,
  primaryMovieData,
  onHandleIMDbPage,
}) {
  return (
    <div className="primary-result">
      <p>
        <strong>Primary Result</strong>
      </p>
      <div className="primary-details">
        <p>
          <strong>{primaryMovie.Title}</strong> | {primaryMovie.Year} |{" "}
          {primaryMovieData.Runtime} | IMDB Rating:{" "}
          {primaryMovieData.imdbRating}
        </p>
        <img
          src={primaryMovie.Poster}
          alt="movie poster"
          onClick={onHandleIMDbPage}
        />
        <p>{primaryMovieData.Plot}</p>
      </div>
    </div>
  );
}
