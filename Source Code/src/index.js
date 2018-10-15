import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App/App.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import SignUpForm from './components/SignUpForm/SignUpForm.jsx';
import Welcome from './components/Welcome/Welcome.jsx';
import CreateNewProject from './components/CreateNewProject/CreateNewProject.jsx';

import './style.css';
import 'normalize.css'
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <Router>
    <div>
      <Route path='/' component={App} />
      <Route exact path='/home' component={Welcome} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/signup' component={SignUpForm} />
      <Route exact path='/createnewproject' component={CreateNewProject} />
    </div>
  </Router>
  , document.getElementById('root'));