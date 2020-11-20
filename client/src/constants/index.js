export const environment = process.env.REACT_APP_BUILD_ENV || 'development'

export const API_BASE_URL = {
  development: 'http://localhost:3001',
  production: 'http://twittive.com',
}

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL[environment]}/login`,
  REQUEST_TOKEN_URL: `${API_BASE_URL[environment]}/login/request_token`,
  SEARCH: `${API_BASE_URL[environment]}/search`,
}

export const resultType = "result_type=popular";