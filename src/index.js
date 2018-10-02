import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

import './style.css';
import 'normalize.css'
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <Router>
    <div>
      <Route path='/' component={App} />
      <Route path='/login' component={LoginForm} />
      <Route path='/signup' component={SignUpForm} />
    </div>
  </Router>
  , document.getElementById('root'));