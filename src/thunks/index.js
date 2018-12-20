import { isLoading, hasErrored } from '../actions'

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
      .t
  }
}