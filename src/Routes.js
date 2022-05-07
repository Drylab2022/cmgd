import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import HomePage from "./components/HomePage/HomePage";
import SamplePage from "./components/SamplePage/SamplePage";
import ProjectPage from "./components/ProjectPage/ProjectPage";

import AuthenticatedRoute from "./components/containers/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/containers/UnauthenticatedRoute";

import ResetPassword from "./components/containers/resetPassword";
import ChangePassword from "./components/containers/changePassword";
import Settings from "./components/containers/settings";
import ChangeEmail from "./components/containers/changeEmail";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/login/reset">
        <ResetPassword />
      </UnauthenticatedRoute>

      <AuthenticatedRoute exact path="/settings/password">
        <ChangePassword />
      </AuthenticatedRoute>

      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>

      <AuthenticatedRoute exact path="/settings">
        <Settings />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/settings/email">
        <ChangeEmail />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/home">
        <HomePage />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/projects/:projectId" component={ProjectPage}/>

      <AuthenticatedRoute exact path="/sample">
        <SamplePage />
      </AuthenticatedRoute>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}