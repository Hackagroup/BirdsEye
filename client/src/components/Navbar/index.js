import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RESET_USER } from '../../actions/types'
import './Navbar.css'
import logo from '../../assets/logo-white.png'
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

function Navbar() {
  const [search, setSearch] = useState('')
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
        <SearchIcon/>
          <input
            className="Navbar__search"
            type="text"
            name="search"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        {search.length > 0 ? <CloseIcon onClick={() => setSearch('')}/> : null}
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
