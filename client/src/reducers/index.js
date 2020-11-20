// This is the root reducer where we bring all other reducers
import { combineReducers } from 'redux'
import userReducer from './user'

const combined = combineReducers({
  user: userReducer,
})

export default combined
