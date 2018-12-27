import { getFavorites } from '../thunks/getFavorites.js'

export const cleanMovies = async (movies, userId) => {
  let favorite = false
  let favoriteMovies

  if (userId) {
    favoriteMovies = await getFavorites(userId)
  }
  
  return movies.results.map(movie => {
    if (favoriteMovies) {
      console.log(favoriteMovies)
      favoriteMovies.forEach(favoriteMovie => {
        if (favoriteMovie.title === movie.title) {
          console.log('TRUE')
          favorite = true          
        } else {
          console.log('FALSE')
          favorite = false
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
}