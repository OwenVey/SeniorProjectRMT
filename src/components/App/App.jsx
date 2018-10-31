import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navbar from '../Navbar/Navbar.jsx'
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx'
import Login from '../Login/Login.jsx';
import Home from '../Home/Home.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import ProjectPage from '../ProjectPage/ProjectPage.jsx';


class App extends Component {

  constructor() {
    super();

    this.state = {
      isAuthenticated: false,
    };
  }

  login = () => {
    this.setState({
      isAuthenticated: true
    })
  }

  logout = () => {
    this.setState({
      isAuthenticated: false
    })
  }

  handleProjectAdded = (project) => {
    this.setState(prevState => ({
      projects: [...prevState.projects, project]
    }))
  }

  render() {
    return (
      <React.Fragment>
        <Navbar onLogout={this.logout}></Navbar>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <PrivateRoute authed={this.state.isAuthenticated} path='/home' component={Home} />
          <PrivateRoute authed={this.state.isAuthenticated} path='/project' component={ProjectPage} />
          <Route path='/login' render={props => <Login {...props} onLogin={this.login} />} />
          <PrivateRoute authed={this.state.isAuthenticated} component={PageNotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;