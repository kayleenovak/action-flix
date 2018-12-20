import { isLoading, hasErrored, signIn } from '../actions/index.js'

export const signIn = (url) => {
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
    .then(user => dispatch(signIn(user.data.id)))
    .catch(() => dispatch(hasErrored))
  }
}