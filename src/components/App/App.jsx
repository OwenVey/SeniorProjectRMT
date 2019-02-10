import React, { Component } from "react";
import { connect } from 'react-redux';
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

  handleProjectAdded = project => {
    this.setState(prevState => ({
      projects: [...prevState.projects, project]
    }));
  };

  render() {
    return (
      <div className="app">
        <Navbar onLogout={this.logout} />
        <Switch>
          <Route
            path="/login"
            component={LoginPage}
          />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <PrivateRoute
            authed={this.props.isAuthenticated}
            path="/home"
            component={HomePage}
          />
          <PrivateRoute
            authed={this.props.isAuthenticated}
            path="/project"
            component={ProjectPage}
          />
          <PrivateRoute
            authed={this.props.isAuthenticated}
            path="/admin"
            component={AdminPage}
            accessToken={this.props.accessToken}
          />
          <PrivateRoute
            authed={this.props.isAuthenticated}
            component={PageNotFound}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  accessToken: state.accessToken,
})

export default connect(mapStateToProps, {})(App)
