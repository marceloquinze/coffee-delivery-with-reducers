export function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'SET_USER_DETAILS':
      return {
        ...state,
        userDetails: action.payload,
      }
    default:
      return state
  }
}
