import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { API_ENDPOINTS } from '../../constants'
import { SET_USER } from '../../actions/types'
import TwitterLoginButton from '../../components/TwitterLoginButton'
import './landing.css'
import logo from '../../assets/logo-white.png'

function Login() {
  const [loading, setLoading] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { isAuthenticated } = user

  function handleFailure(err) {
    console.log(err)
    setLoading(false)
    setErrMessage('Error! Try again.')
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
      setLoading(false)
    })
  }

  if (!loading && isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <>
      <Helmet>
        <title>#BirdsEye</title>
      </Helmet>
      <section>
        <div id="panel">
          <br></br>
          <h1>Welcome to #BirdsEye</h1>
          <img src={logo} width="180" height="110" alt="Birds eye logo"></img>
          <br></br>
          <hr></hr>
          <h3>"A closer look at the big picture"</h3>
          <br></br>
          <br></br>
          <TwitterLoginButton
            loginUrl={API_ENDPOINTS.LOGIN}
            onFailure={handleFailure}
            onSuccess={handleSuccess}
            requestTokenUrl={API_ENDPOINTS.REQUEST_TOKEN_URL}
            text={errMessage === '' ? (loading ? 'Please wait' : 'Authorize') : errMessage}
            disabled={loading}
            onClickCallback={() => {
              setLoading(true)
              setErrMessage('')
            }}
          />
        </div>
      </section>
    </>
  )
}

export default Login
