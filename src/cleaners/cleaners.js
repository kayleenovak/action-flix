export const cleanMovies = (movies) => {
  return movies.results.map(movie => {
    return {
      movieId: movie.id,
      posterPath: `http://image.tmdb.org/t/p/w185/${movie.poster_path}`,
      title: movie.title,
      voteAverage: movie.vote_average,
      releaseDate: movie.release_date,
      overview: movie.overview
    }
  })
}