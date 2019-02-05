import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Navbar from "../Navbar/Navbar.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import LoginPage from "../LoginPage/LoginPage.jsx";
import HomePage from "../Home/HomePage/HomePage.jsx";
import ProjectPage from "../Projects/ProjectPage/ProjectPage.jsx";
import AdminPage from "../Admin/AdminPage/AdminPage.jsx";
import PageNotFound from "../PageNotFound/PageNotFound.jsx";

library.add(fas, far);

class App extends Component {
  constructor() {
    super();

    this.state = {
      isAuthenticated: false,
      accessToken: '',
    };
  }

  login = () => {
    this.setState({
      isAuthenticated: true
    });
  };

  logout = () => {
    this.setState({
      isAuthenticated: false
    });
  };

  handleProjectAdded = project => {
    this.setState(prevState => ({
      projects: [...prevState.projects, project]
    }));
  };

  setAccessToken = (accessToken) => {
    this.setState({ accessToken });
  }

  render() {
    return (
      <div className="app">
        <Navbar onLogout={this.logout} />
        <Switch>
          <Route
            path="/login"
            render={props => <LoginPage {...props} onLogin={this.login} setAccessToken={this.setAccessToken} />}
          />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <PrivateRoute
            authed={this.state.isAuthenticated}
            path="/home"
            component={HomePage}
          />
          <PrivateRoute
            authed={this.state.isAuthenticated}
            path="/project"
            component={ProjectPage}
            accessToken = {this.state.accessToken}
          />
          <PrivateRoute
            authed={this.state.isAuthenticated}
            path="/admin"
            component={AdminPage}
            accessToken={this.state.accessToken}
          />
          <PrivateRoute
            authed={this.state.isAuthenticated}
            component={PageNotFound}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
