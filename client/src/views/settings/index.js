import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import './settings.css'

function Settings() {
  const user = useSelector((state) => state.user)
  const { userCredentials } = user
  const { screen_name } = userCredentials

  return (
    <>
      <Helmet>
        <title>#BirdsEye - Settings</title>
      </Helmet>
      <div id="lower">
        <img src="https://i.imgur.com/qZJqj94.png" />
        <p>Username: {screen_name}</p>
        <p>Other Info</p>
      </div>
    </>
  )
}

export default Settings
