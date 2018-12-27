import { isLoading, hasErrored } from '../actions'

export const getFavorites = (userId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites`
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if (!response.ok) {
        dispatch(isLoading(false))
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      const data = await response.json()
      return data.data
    } catch (error) {
      dispatch(hasErrored(true))
    }
  }
}