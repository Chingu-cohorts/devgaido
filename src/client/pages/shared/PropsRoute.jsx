import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

const renderWithProps = (component, routeProps, passdownProps, passdownArr) => {
  const finalProps = { ...routeProps };
  if (passdownArr) {
    passdownArr.forEach((prop) => {
      if (passdownProps[prop]) {
        finalProps[prop] = passdownProps[prop];
      }
    });
  }
  return createElement(component, finalProps);
};

/*
To allow passing down props from <App /> to the Route's component
we use Route's "render" prop instead of "component".
(When using the "component" prop, we cannot pass down additional props.)
Just putting the component as a child of Route and then adding props would allow passing down props
as well, but then we cannot access the routeProps which are passed down to the component
when using the component or render prop instead. So using "render" is the only way here.
*/

const PropsRoute = ({ component, passdown, passdownProps, ...props }) => (
  <Route
    path={props.path}
    exact={props.exact}
    render={
      routeProps => (renderWithProps(component, routeProps, passdownProps, passdown))
    }
  />
);

PropsRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  passdown: PropTypes.arrayOf(PropTypes.string),
  passdownProps: PropTypes.objectOf(PropTypes.shape),
  component: PropTypes.func.isRequired,
  children: PropTypes.node,
};

PropsRoute.defaultProps = {
  exact: false,
  children: null,
  passdown: null,
  passdownProps: null,
};

export default PropsRoute;
