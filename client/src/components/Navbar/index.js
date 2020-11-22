import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RESET_USER } from '../../actions/types'
import './Navbar.css'
import logo from '../../assets/logo-white.png'

function Navbar() {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { pathname } = location

  if (pathname === '/landing') { // Don't render navbar on landing page
    return null
  }

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
          onClick={() => {
            // Clear token from localstorage
            localStorage.removeItem('userCredentials')
            // Clear redux state
            dispatch({
              type: RESET_USER
            })
            // Go to landing page
            history.push('/landing')
          }}
          className="Navbar__link Navbar__link-logout"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
