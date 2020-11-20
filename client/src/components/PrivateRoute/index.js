import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute(props) {
  const { component: Component, ...rest } = props

  const user = useSelector((state) => state.user)
  const { isAuthenticated } = user

  if (isAuthenticated !== true) {
    // If not logged in, redirect to landing page
    return <Redirect to="/landing" />
  }

  // If loggin in, render the component
  return <Route {...rest} component={Component} />
}
export default PrivateRoute
