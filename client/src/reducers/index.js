// This is the root reducer where we bring all other reducers
import { combineReducers } from 'redux'
import userReducer from './user'
import applicationReducer from './application'

const combined = combineReducers({
  user: userReducer,
  application: applicationReducer,
})

export default combined
