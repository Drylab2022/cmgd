import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import HomePage from "./components/HomePage/HomePage";
import SamplePage from "./components/SamplePage/SamplePage";
import ProjectPage from "./components/ProjectPage/ProjectPage";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/signup">
        <Signup />
      </Route>

      <Route exact path="/home">
        <HomePage />
      </Route>


      <Route exact path="/samplepage">
        <SamplePage />
      </Route>

      <Route exact path="/projectpage">
        <ProjectPage />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}