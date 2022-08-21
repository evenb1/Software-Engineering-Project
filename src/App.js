import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import * as routes from "./constants/routes";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import PasswordForgetPage from "./components/PasswordForget";
import AccountPage from "./components/Account";
import LandingPage from "./components/Landing";
import withAuthentication from "./components/withAuthentication";
import Dashboard from './dashboard/Dashboard';
import StaffDashboard from './components/StaffDashboard';


const App = () => (
  <BrowserRouter>
      <Route exact path={routes.LANDING} component={LandingPage} />
    <Route exact path={routes.SIGN_UP} component={SignUpPage} />
    <Route exact path={routes.EMPLOYEEDASH} component={Dashboard} />
    <Route exact path={routes.STAFFDASH} component={StaffDashboard} />
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
    
      {/* <Route exact path={routes.HOME} component={HomePage} /> */}
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
  </BrowserRouter>
);

export default withAuthentication(App);
