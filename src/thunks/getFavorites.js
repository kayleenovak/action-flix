import { isLoading, hasErrored } from '../actions/index.js'

export const getFavorites = (userId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites`
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      const favorites = await response.json()
      return favorites.data
    } catch (error) {
      dispatch(hasErrored(true))
    }
  }
}