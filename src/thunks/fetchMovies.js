import { isLoading, hasErrored, fetchDataSuccess } from './actions/index.js'

export const fetchMovies = (url) => {
  return (dispatch) => {
    dispatch(isLoading(true))
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      return response
    })
    .then(response => response.json())
    .then(movies => dispatch(fetchDataSuccess(movies)))
    .catch(() => dispatch(hasErrored))
  }
}