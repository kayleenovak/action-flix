export const signInReducer = (state='', action) => {
  switch(action.type) {
    case 'SIGN_IN': 
      return action.id
    default: 
      return state
  }
}