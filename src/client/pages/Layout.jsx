import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div className="center">
    <h1>Hello</h1>
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Layout;
