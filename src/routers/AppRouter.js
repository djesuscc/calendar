import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { Login } from '../components/auth/Login';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';


export const AppRouter = () => {
  
  const dispatch = useDispatch();
  const { uid, checking } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch])

  if (checking) {
    return (<h5>Wait...</h5>)
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoutes
            isAuth={!!uid} 
            path='/login'
            component={Login}
          />
          <PrivateRoutes
            isAuth={!!uid} 
            exact
            path="/"
            component={CalendarScreen}
          />

          <Redirect 
            to="/login"
          />
        </Switch>
      </div>
    </Router>
  )
}
