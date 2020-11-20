import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 10px' }}>
      <Link to="/">
        Home
      </Link>
      <Link to="/search">
        Search
      </Link>
      <Link to="/settings">
        Settings
      </Link>
    </div>
  )
}

export default Navbar
