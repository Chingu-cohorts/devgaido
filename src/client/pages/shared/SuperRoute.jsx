import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

const getChildrenWithProps = (children, passdownArr, props) => {
  const newProps = {};
  if (passdownArr) {
    passdownArr.forEach((prop) => {
      if (props[prop]) {
        newProps[prop] = props[prop];
      }
    });
  }
  const childrenWithProps = React.Children.map(children,
     child => React.cloneElement(child, newProps),
  );
  return childrenWithProps[0];
};

const SuperRoute = ({ children, ...props }) => (
  <Route
    path={props.path}
    exact={props.exact}
  >
    { getChildrenWithProps(children, props.passdown, props.passdownProps) }
  </Route>
);

SuperRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  passdown: PropTypes.arrayOf(PropTypes.string),
  passdownProps: PropTypes.objectOf(PropTypes.shape),
  children: PropTypes.node,
};

SuperRoute.defaultProps = {
  exact: false,
  children: null,
  passdown: null,
  passdownProps: null,
};

export default SuperRoute;
