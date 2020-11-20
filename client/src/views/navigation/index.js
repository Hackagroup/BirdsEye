import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import API from '../../api'


function Navigation(){
    return(
        <nav>
          <Link to="/">Home</Link>|
          <Link to="/search">Search</Link>|
          <Link to="/settings">Settings</Link>|
          <Link to="/logout">Logout</Link>
        </nav>
    )
}

export default Navigation