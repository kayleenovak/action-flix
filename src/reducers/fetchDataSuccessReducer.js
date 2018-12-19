export const fetchDataSuccessReducer = (state=[], action) => {
  switch(action.type) {
    case 'FETCH_DATA_SUCCESS': 
      return action.movies
    default: 
      return state
  }
}
