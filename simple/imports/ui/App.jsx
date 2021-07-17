import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SignIn from './signIn';
import Signup from './Signup';

import globalStyles from '/imports/global-styles.css';

export function App() {

  return (
    <div>
      <Router>
        <Switch>

          <Route path="/" exact>
            <SignIn/>
          </Route>

          <Route path="/create-account">
            <Signup/>
          </Route>

          <Route path="/comments">
            comments
          </Route>

        </Switch>
      </Router>
    </div>
  )
}