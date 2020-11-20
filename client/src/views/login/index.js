import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { API_ENDPOINTS } from '../../constants'
import { SET_USER } from '../../actions/types'
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js'
import './login.css'

function Login() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { isAuthenticated } = user

  function handleFailure(err) {
    console.log(err)
  }

  function handleSuccess(res) {
    res.json().then((userCredentials) => {
      localStorage.setItem('userCredentials', JSON.stringify(userCredentials))
      dispatch({
        type: SET_USER,
        payload: {
          isAuthenticated: true,
          userCredentials,
        },
      })
    })
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div style={{ padding: '150px 0 0 150px' }}>
        <TwitterLogin
          loginUrl={API_ENDPOINTS.LOGIN}
          onFailure={handleFailure}
          onSuccess={handleSuccess}
          requestTokenUrl={API_ENDPOINTS.REQUEST_TOKEN_URL}
        />
      </div>
    </>
  )
}

export default Login
