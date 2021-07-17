import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SignIn from './SignIn';
import Signup from './Signup';
import Comments from './Comments';

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
            <Comments/>
          </Route>

        </Switch>
      </Router>
    </div>
  )
}