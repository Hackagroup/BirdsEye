import { SET_SEARCH, SET_FILTERS, SET_STATE, RESET_SEARCH, RESET_FILTERS, RESET_STATE } from '../actions/types'

const initialState = {
  searchQuery: '',
  searchQueryStatus: -1, // -1: initial, 0:loading, loaded
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
        searchFilters: action.payload
      }
    case SET_STATE:
      return {
        ...state,
        ...action.payload
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
    case RESET_STATE:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default userReducer
