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

export const signIn = (id) => ({
  type: 'SIGN_IN',
  id
})