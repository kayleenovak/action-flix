export const getFilms = async () => {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=8d54c10134c07bfb8e01ded9e30524be&with_genres=28'
  const response = await fetch(url)
  const movies = await response.json()
  const actionMovies = await cleanMovies(movies)
  return actionMovies
}

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