import { isLoading, hasErrored, signIn } from '../actions/index.js'

export const createUser = (name, email, password) => {
  const url = 'http://localhost:3000/api/users/new'
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        dispatch(isLoading(false))
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      const user = await response.json()
      dispatch(signIn(user.id, name))
    } catch (error) {
      dispatch(hasErrored(true))
    }
  }
}
