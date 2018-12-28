import { isLoading, hasErrored } from '../actions'

export const postFavorite = (movies, movieId, userId, title, posterPath, releaseDate, voteAverage, overview) => {
  const url = 'http://localhost:3000/api/users/favorites/new'
  
  const isFavorite = movies.find(movie => {
    return movie.id === movieId
  })

  if (!isFavorite) {
    return async (dispatch) => {
      try {
        dispatch(isLoading(true))
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ 
            movie_id: movieId,
            user_id: userId,
            title: title,
            poster_path: posterPath,
            release_date: releaseDate,
            vote_average: voteAverage,
            overview: overview  
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          dispatch(isLoading(false))
          throw Error(response.statusText)
        }
        dispatch(isLoading(false))
        const data = await response.json()
      } catch (error) {
        dispatch(hasErrored(true))
      }
    }
  }
}