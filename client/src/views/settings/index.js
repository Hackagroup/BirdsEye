import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';



function Settings(){

    function getUser(){
      return localStorage.getItem('userCredentials')
    }

    let userData = (getUser())
    console.log(userData["oauth_token_secret"])
    console.log(userData.screen_name)

    return(
        <>
          <Helmet>
            <title title>Settings</title>
          </Helmet>
          <div id="lower">
            <img src="https://i.imgur.com/qZJqj94.png"/>

            <p>username : {getUser()["screen_name"]} </p>
            
            <p> Other Info </p>
          </div>

        </>
    )
}

export default Settings