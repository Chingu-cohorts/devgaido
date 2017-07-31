/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import StickyNav from './StickyNav';


// TODO: Change nav bar to be hidden on scroll down and visible on scroll up instead of just "fixed"
const Header = ({ user, uiState, lock }) => (
  <header>
    <StickyNav
      user={user}
      uiState={uiState}
      lock={lock}
    />
  </header>
);

Header.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  lock: PropTypes.objectOf(PropTypes.shape),
};

Header.defaultProps = {
  lock: null,
};

export default Header;

