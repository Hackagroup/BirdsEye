import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AnimatePresence } from 'framer-motion'

import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'

import Landing from './views/landing/'
import Dashboard from './views/dashboard/'
import Search from './views/search'
import Settings from './views/settings'

import store from './store'
import { SET_USER } from './actions/types'
import isEmpty from './utils/isEmpty'

import SlideRouter, { initSlideRouter } from 'react-slide-animation-router'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

initSlideRouter({
  history,
  routeAnimationDuration: 350,
})

function Wrapper(){
    return(
        <Provider store={store}>
          <Router>
            <Route component={App} />
          </Router>
        </Provider>
    )
}



// Check for user credentials in local storage (in-case app is reloaded/reopened)
if (!isEmpty(localStorage.userCredentials)) {
  store.dispatch({
    type: SET_USER,
    payload: {
      isAuthenticated: true,
      userCredentials: JSON.parse(localStorage.userCredentials),
    },
  })
}


function App(){

  
    const location = useLocation()
    return(
      <>
        <Navbar />
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/landing" component={Landing} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/search" component={Search} />
            <PrivateRoute exact path="/settings" component={Settings} />
            {/* Default route */}
            <Route component={Landing} />
          </Switch>
        </AnimatePresence>
      </>
    )

}

export default Wrapper
