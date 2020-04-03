import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import HomePage from "./pages/HomePage";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";

import AppLayout from "./layouts/AppLayout";
import Navbar from "./components/Navbar";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home">
          <AppLayout header={<Navbar />} main={<HomePage />} />
        </Route>
        <Route path="/page1">
          <AppLayout header={<Navbar />} main={<Page1 />} />
        </Route>
        <PrivateRoute path="/page2">
          <AppLayout header={<Navbar />} main={<Page2 />} />
        </PrivateRoute>
        <Route path="/login">
          <AppLayout header={<Navbar />} main={<LoginPage />} />
        </Route>
        <Route path="/signup">
          <AppLayout header={<Navbar />} main={<SignUpPage />} />
        </Route>
        <Redirect to="/notfound" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
