import axios from 'axios'
import isEmpty from './isEmpty'

function setAuthToken(token) {
  if (!isEmpty(token)) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token
    axios.defaults.headers.common['Authorization'] = token
  } else {
    // Delete Authorization header
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
