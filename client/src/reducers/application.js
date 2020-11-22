import { SET_SEARCH, SET_FILTERS, RESET_SEARCH, RESET_FILTERS } from '../actions/types'

const initialState = {
  searchQuery: '',
  searchFilters: {},
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        searchQuery: action.payload,
      }
    case SET_FILTERS:
      return {
        ...state,
        searchFilters: action.payload,
      }
    case RESET_SEARCH:
      return {
        ...state,
        searchQuery: initialState.searchQuery,
      }
    case RESET_FILTERS:
      return {
        ...state,
        searchFilters: initialState.searchFilters,
      }
    default:
      return state
  }
}

export default userReducer
