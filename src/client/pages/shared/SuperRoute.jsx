import React from 'react';
import { Route } from 'react-router';

const getChildrenWithProps = (children, passdownArr, props) => {
  const newProps = {};
  if (passdownArr !== undefined) {
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

export default ({ children, ...props }) => (
  <Route
    path={props.path}
    exact={props.exact}
  >
    {getChildrenWithProps(children, props.passdown, props.passdownProps)}
  </Route>
  );
