import React, { Component } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Login from "./login";
import Home from "./home";
import { Auth } from "@sixsprint/auth";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <React.Fragment>
            <Auth.Provider>
              <Switch>
                <Route path={"/login"} component={Login} />
                <Route path={"/home"} component={Home} />
                <Redirect to={"/login"} />
              </Switch>
              <NotificationContainer />
            </Auth.Provider>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}
