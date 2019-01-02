import { isLoading, hasErrored } from '../actions/index.js'

export const deleteFavorite = (userId, movieId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites/${movieId}`
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({
          user_id: userId,
          movie_id: movieId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw Error(response.statusText)
        dispatch(isLoading(false))
      }
      dispatch(isLoading(false))
    } catch (error) {
      dispatch(hasErrored(true))
    }
  }
}
