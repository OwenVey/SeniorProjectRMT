import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx'
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx'
import LoginPage from '../LoginPage/LoginPage.jsx';
import HomePage from '../Home/HomePage/HomePage.jsx';
import ProjectPage from '../Projects/ProjectPage/ProjectPage.jsx';
import AdminPage from '../Admin/AdminPage/AdminPage.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';

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
      <div className='app'>
        <Navbar onLogout={this.logout}></Navbar>
        <Switch>
          <Route path='/login' render={props => <LoginPage {...props} onLogin={this.login} />} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <PrivateRoute authed={this.state.isAuthenticated} path='/home' component={HomePage} />
          <PrivateRoute authed={this.state.isAuthenticated} path='/project' component={ProjectPage} />
          <PrivateRoute authed={this.state.isAuthenticated} path='/admin' component={AdminPage} />
          <PrivateRoute authed={this.state.isAuthenticated} component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;