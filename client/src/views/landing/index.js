import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { API_ENDPOINTS } from '../../constants'
import { SET_USER } from '../../actions/types'
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js'
import TwitterLogin2 from 'react-twitter-login'
import './landing.css'
import logo from '../../assets/logo-white.png'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'

function Login() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { isAuthenticated } = user
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }))

  const classes = useStyles()

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

  const authHandler = (err, data) => {
    console.log(err)
    console.log(data)
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
          <TwitterLogin
            loginUrl={API_ENDPOINTS.LOGIN}
            onFailure={handleFailure}
            onSuccess={handleSuccess}
            requestTokenUrl={API_ENDPOINTS.REQUEST_TOKEN_URL}
            children={
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
              ></Button>
            }
          ></TwitterLogin>
          {/* <TwitterLogin2
            authCallback={authHandler}
            consumerKey={process.env.TWITTER_CONSUMER_API_KEY}
            consumerSecret={process.env.TWITTER_CONSUMER_API_SECRET}
          /> */}
        </div>
      </section>
    </>
  )
}

export default Login
