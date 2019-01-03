import { isLoading, hasErrored, signIn } from '../actions/index.js'

export const getUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
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
      dispatch(signIn(user.data.id, user.data.name))
    } catch (error) {
      dispatch(hasErrored(true))
    }
  }
}
