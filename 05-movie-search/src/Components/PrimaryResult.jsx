export function PrimaryResult({
  isLoading,
  primaryMovie,
  primaryMovieData,
  onHandleIMDbPage,
}) {
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
          {primaryMovieData.Runtime} | IMDB Rating:{" "}
          {primaryMovieData.imdbRating}
        </p>
        <img
          src={primaryMovie.Poster}
          alt="movie poster"
          onClick={onHandleIMDbPage}
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
