export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return action.movies
    default:
      return state
  }
}
