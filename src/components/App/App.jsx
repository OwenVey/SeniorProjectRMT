import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Navbar from "../Navbar/Navbar.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import LoginPage from "../LoginPage/LoginPage.jsx";
import RecoveryPage from "../RecoveryPage/RecoveryPage.jsx"
import HomePage from "../Home/HomePage/HomePage.jsx";
import ProjectPage from "../Projects/ProjectPage/ProjectPage.jsx";
import AdminPage from "../Admin/AdminPage/AdminPage.jsx";
import ProfilePage from "../Profile/ProfilePage/ProfilePage.jsx"
import PageNotFound from '../PageNotFound/PageNotFound.jsx';


library.add(fas, far);

const App = () => (

  <div className="app">
    <Navbar />
    <Switch>
      <Route
        path="/login"
        component={LoginPage}
      />
      <Route
        path="/recovery"
        component={RecoveryPage}
      />
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <PrivateRoute
        path="/home"
        component={HomePage}
      />
      <PrivateRoute
        path="/project"
        component={ProjectPage}
      />
      <PrivateRoute
        path="/admin"
        component={AdminPage}
      />
      <PrivateRoute
        path="/profile"
        component={ProfilePage}
      />
      <PrivateRoute
        component={PageNotFound}
      />
    </Switch>
  </div>
)

export default App
