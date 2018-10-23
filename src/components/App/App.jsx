import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../Navbar/Navbar.jsx'
import LoginForm from '../LoginForm/LoginForm.jsx';
import SignUpForm from '../SignUpForm/SignUpForm.jsx';
import Welcome from '../Welcome/Welcome.jsx';
import CreateNewProject from '../CreateNewProject/CreateNewProject';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import ProjectPage from '../ProjectPage/ProjectPage.jsx';
import data from '../App/data.js'

class App extends Component {

  constructor() {
    super();
    const PROJECTS = data.projects;

    this.state = {
      projects: PROJECTS
    };
  }

  handleProjectAdded = (project) => {
    this.setState(prevState => ({
      projects: [...prevState.projects, project]
    }))
  }

  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/' render={props => <Welcome {...props} projects={this.state.projects} />} />
          <Route path='/login' component={LoginForm} />
          <Route path='/signup' component={SignUpForm} />
          <Route path='/createnewproject' render={props => <CreateNewProject {...props} onProjectAdded={this.handleProjectAdded} />} />
          <Route path='/project' component={ProjectPage} />
          <Route component={PageNotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;