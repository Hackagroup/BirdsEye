export const environment = process.env.REACT_APP_BUILD_ENV || 'production'

export const API_BASE_URL = {
  development: 'http://localhost:3001',
  production: 'http://18.220.176.33/api',
}

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL[environment]}/login`,
  REQUEST_TOKEN_URL: `${API_BASE_URL[environment]}/login/request_token`,
  TWEET: `${API_BASE_URL[environment]}/tweet`,
  USER: `${API_BASE_URL[environment]}/user`,
}
