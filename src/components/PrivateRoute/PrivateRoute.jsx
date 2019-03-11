import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}

      render={(props) => isAuthenticated === true
        ? <Component {...props} {...rest} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoute)
