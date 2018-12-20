export const signInReducer = (state='', action) => {
  switch(action.type) {
    case 'SIGN_IN': 
      return action.id
    case 'NEW_USER':
      return action.id
    case 'LOG_OUT':
      return ''
    default: 
      return state
  }
}