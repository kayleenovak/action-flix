import { getFavorites } from '../thunks/getFavorites.js'

export const cleanMovies = async (movies, userId) => {
  let favoriteMovies
  if (userId) {
    favoriteMovies = await getFavorites(userId) 
  }
  const allMovies = movies.results.map(movie => {
    let favorite = false
    if (favoriteMovies) {
      favoriteMovies.forEach(favoriteMovie => {
        if (favoriteMovie.title === movie.title) {
          favorite = true      
          console.log(favorite)    
        }
      })
    }
    return {
      movieId: movie.id,
      posterPath: `http://image.tmdb.org/t/p/w185/${movie.poster_path}`,
      title: movie.title,
      voteAverage: movie.vote_average,
      releaseDate: movie.release_date,
      overview: movie.overview,
      favorite: `${favorite}`
    }
  })
  return allMovies
}