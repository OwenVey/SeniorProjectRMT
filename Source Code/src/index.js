import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App/App.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import ProjectDashboard from './components/ProjectDashboard/ProjectDashboard.jsx'
import SignUpForm from './components/SignUpForm/SignUpForm.jsx';
import Welcome from './components/Welcome/Welcome.jsx';

import './style.css';
import 'normalize.css'
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <Router>
    <div>
      <Route path='/' component={App} />
      <Route exact path='/home' component={Welcome} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/projectdashboard' component={ProjectDashboard} />
      <Route exact path='/signup' component={SignUpForm} />
    </div>
  </Router>
  , document.getElementById('root'));