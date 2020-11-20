import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import API from '../../api'


function Navigation(){
    return(
        <nav>
          <a href="#">Home</a> |
          <a href="#">Search</a> |
          <a href="#">Settings</a> |
          <a href="#">Logout</a>
        </nav>
    )
}

export default Navigation