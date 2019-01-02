import { isLoading, hasErrored, newUser } from '../actions/index.js'

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
      console.log(response)
      if (!response.ok) {
        dispatch(isLoading(false))
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      const user = await response.json()
      console.log(user)
      dispatch(newUser(user.id))
    } catch (error) {
      console.log(error)
      dispatch(hasErrored(true))
    }
  }
}
