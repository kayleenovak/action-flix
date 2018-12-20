import { isLoading, hasErrored, signIn } from '../actions/index.js'

export const getUser = (email, password) => {
  return (dispatch) => {
    dispatch(isLoading(true))
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify({email: email, password: password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        dispatch(isLoading(false))
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      return response
    })
    .then(response => response.json())
    .then(user => dispatch(signIn(user.data.id)))
    .catch(() => dispatch(hasErrored(true)))
  }
}