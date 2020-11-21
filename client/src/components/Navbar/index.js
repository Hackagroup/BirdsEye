import React from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/logo-white.png'

function Navbar() {
  const history = useHistory()
  return (
    <div className="Navbar">
      <div className="Navbar__left">
        <Link className="Navbar__logo" to="/dashboard">
          <img src={logo} alt="Birds eye logo"></img>
        </Link>
        <input className="Navbar__search" type="search" name="search" placeholder="Search..." />
      </div>
      <div className="Navbar__right">
        <button
          onClick={() => history.push('/settings')}
          className="Navbar__link Navbar__link-settings"
        >
          Settings
        </button>
        <button
          onClick={() => history.push('/logout')}
          className="Navbar__link Navbar__link-logout"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
