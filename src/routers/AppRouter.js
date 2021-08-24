import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/login"
            component={Login}
          />
          <Route
            exact
            path="/"
            component={CalendarScreen}
          />
        </Switch>
      </div>
    </Router>
  )
}
