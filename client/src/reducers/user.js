import { SET_USER, RESET_USER } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  userCredentials: null,
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      }
    case RESET_USER:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default userReducer
