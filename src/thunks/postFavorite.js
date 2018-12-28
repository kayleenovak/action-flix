import { isLoading, hasErrored } from '../actions'

export const postFavorite = (movieId, userId, title, posterPath, releaseDate, voteAverage, overview) => {
  const url = 'http://localhost:3000/api/users/favorites/new'
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