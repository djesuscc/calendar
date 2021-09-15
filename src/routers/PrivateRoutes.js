import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoutes = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route 
      {...rest}
      component={(props) => 
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}


PrivateRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
}