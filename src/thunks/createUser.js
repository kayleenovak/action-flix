import { isLoading, hasErrored, newUser } from '../actions/index.js'

export const createUser = (name, email, password) => {
  return (dispatch) => {
    dispatch(isLoading(true))
    fetch('http://localhost:3000/api/users/new', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
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
    .then(user => dispatch(newUser(user.id)))
    .catch(() => dispatch(hasErrored(true)))
  }
}