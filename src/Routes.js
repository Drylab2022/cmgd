import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import HomePage from "./components/HomePage/HomePage";
import SamplePage from "./components/SamplePage/SamplePage";
import ProjectPage from "./components/ProjectPage/ProjectPage";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/homepage">
        <HomePage />
      </Route>


      <Route exact path="/samplepage">
        <SamplePage />
      </Route>

      <Route exact path="/projectpage">
        <ProjectPage />
      </Route>
    </Switch>
  );
}