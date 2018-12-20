export const signInReducer = (state='', action) => {
  switch(action.type) {
    case 'SIGN_IN': 
      return action.id
    case 'NEW_USER':
      return action.id
    default: 
      return state
  }
}