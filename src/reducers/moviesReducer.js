export const moviesReducer = (state=[], action) => {
  switch(action.type) {
    case 'FETCH_DATA_SUCCESS': 
      return action.movies
    case 'TOGGLE_FAVORITE':
      const newState = state.map(movie => {
        if (movie.title === action.movieTitle) {
          movie.favorite = !movie.favorite
        } 
        return movie
      })
      return newState
    default: 
      return state
  }
}
