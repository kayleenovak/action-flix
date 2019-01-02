export const getUserNameReducer = (state='', action) => {
  switch(action.type) {
    case 'SIGN_IN': 
      return action.name
    default: 
    return state
  }
}