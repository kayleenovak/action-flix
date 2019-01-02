export const isLoading = (check) => ({
  type: 'IS_LOADING',
  isLoading: check
})

export const hasErrored = (check) => ({
  type: 'HAS_ERRORED',
  hasErrored: check
})

export const fetchDataSuccess = (movies) => ({
  type: 'FETCH_DATA_SUCCESS',
  movies
})

export const signIn = (id, name) => ({
  type: 'SIGN_IN',
  id,
  name
})

export const newUser = (id) => ({
  type: 'NEW_USER',
  id
})

export const logOut = () => ({
  type: 'LOG_OUT'
})

export const toggleFavorite = (movieTitle) => ({
  type: 'TOGGLE_FAVORITE',
  movieTitle
})
