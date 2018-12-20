export const cleanMovies = (movies) => {
  return movies.results.map(movie => {
    return {
      poster: `http://image.tmdb.org/t/p/w185/${movie.poster_path}`,
      title: movie.title,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      description: movie.overview
    }
  })
}
