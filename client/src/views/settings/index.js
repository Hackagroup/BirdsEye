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
      <section id="settings-page-content">
        <div id="settings-panel">
          <div class="title-wrapper" >
            <h2 class="setting-title">User Information</h2>
          </div>
          
          <hr id="settings-hr"></hr>
          
          {/* Add user photo here */}
          <img height="180" width="180" src="https://i.imgur.com/qZJqj94.png" />
          
          <div class="text-wrapper">

            /* Add user info here */
            <p><strong>Username:</strong> <br></br>{screen_name}</p>
            <p><strong>Name:</strong> <br></br></p>
            <p><strong>Bio:</strong> <br></br> </p>
            <p><strong>Location:</strong> <br></br> </p>
          </div>
          
          <br></br>
          <div class="title-wrapper" >
            <h2 class="setting-title">Display Settings</h2>
          </div>
          
          <hr id="settings-hr"></hr>

          {/* Drop down for filtering - may want to change to Material UI*/}
          <div class="text-wrapper">
            <div><strong>Filter By:</strong>
              <div class="dropdown">
                <button class="dropbtn">- Select -</button>
                <div class="dropdown-content">
                  <a href="#">Mixed</a>
                  <a href="#">Popularity</a>
                </div>
              </div>
            </div>

            {/* Drop down for # Tweets - may want to change to Material UI*/}
            <div><strong>Tweets Displayed:</strong> 
              <div class="dropdown">
                  <button class="dropbtn">- Select -</button>
                  <div class="dropdown-content">
                    <a href="#">10</a>
                    <a href="#">20</a>
                    <a href="#">30</a>
                  </div>
                </div>
            </div>
          </div>

        </div>
      </section>
      
    </>
  )
}

export default Settings
