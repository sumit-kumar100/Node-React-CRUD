import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import Dashboard from "./dashboard";
import Sidebar from "../components/Sidebar";
import Preloader from "../components/Preloader";

const RouteWithSidebar = ({ component: Component, ...rest }) => {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />
        <main className="content mt-4">
          <Component {...props} />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithSidebar exact path={Routes.Dashboard.path} component={Dashboard} />
    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
