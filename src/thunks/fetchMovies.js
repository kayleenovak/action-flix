import { isLoading, hasErrored, fetchDataSuccess } from '../actions/index.js'
import { cleanMovies } from '../cleaners/cleaners.js'

export const fetchMovies = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.statusText)
      }      
      dispatch(isLoading(false))
      const data = await response.json()
      const movies = await cleanMovies(data)
      dispatch(fetchDataSuccess(movies))
    } catch (error) {
      dispatch(hasErrored(true))
    }
  }
}