import { isLoading, hasErrored, fetchDataSuccess } from '../actions/index.js'
import { cleanMovies } from '../cleaners/cleaners.js'

export const fetchMovies = (url) => {
  return (dispatch) => {
    dispatch(isLoading(true))
     fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      return response})
    .then(response => response.json())
    .then(movies => cleanMovies(movies))
    .then(cleanMovies => dispatch(fetchDataSuccess(cleanMovies)))
    .catch(() => dispatch(hasErrored))
    }
  }
