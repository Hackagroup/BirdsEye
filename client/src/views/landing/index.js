import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div>
        Landing page
        <br />
        <Link to="/login">Go to login</Link>
        <br />
        <Link to="/dashboard">Go to dashboard (must be authenticated first)</Link>
      </div>
    </>
  )
}

export default Landing
