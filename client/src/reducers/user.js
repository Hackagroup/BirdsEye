import { SET_USER } from '../actions/types'

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
    default:
      return state
  }
}

export default userReducer
