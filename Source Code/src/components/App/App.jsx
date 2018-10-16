import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar.jsx'
import { Route, Switch } from 'react-router-dom';

import LoginForm from '../LoginForm/LoginForm.jsx';
import SignUpForm from '../SignUpForm/SignUpForm.jsx';
import Welcome from '../Welcome/Welcome.jsx';
import CreateNewProject from '../CreateNewProject/CreateNewProject';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/login' component={LoginForm} />
          <Route path='/signup' component={SignUpForm} />
          <Route path='/createnewproject' component={CreateNewProject} />
          <Route component={PageNotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;