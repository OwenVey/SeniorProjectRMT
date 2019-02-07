import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './components/App/App.jsx';
import { Provider } from 'react-redux'

import store from "./store";

import 'normalize.css'
import "antd/dist/antd.css";
import './style.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));