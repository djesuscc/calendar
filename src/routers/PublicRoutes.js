import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoutes = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route 
      {...rest}
      component={(props) => 
        !isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}


PublicRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}