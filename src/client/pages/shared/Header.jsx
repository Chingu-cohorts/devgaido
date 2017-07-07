import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toggleNavMenu } from '../../actions/globalActions';

import { MenuCard } from '../shared/Cards';

const handleLoginClick = (e, lock) => {
  e.preventDefault();
  lock.show();
};

const toggleMenu = (e, dispatch) => {
  e.preventDefault();
  dispatch(toggleNavMenu());
};

const toggleMenuAfterNav = (dispatch) => {
  dispatch(toggleNavMenu());
};

// TODO: Change nav bar to be hidden on scroll down and visible on scroll up instead of just "fixed"
const Header = ({ user, uiState, dispatch, lock }) => (
  <header>
    <div className="container flex justify-space-between align-items-center padding-vertical-small relative">
      <NavLink to="/" className="logo" />
      <nav className="flex align-items-center">
        <ul className="flex align-items-center no-margin list-style-none uppercase">
          <li className="margin-right-small"><NavLink to="/styleguide" activeClassName="boxshadow-underline bold">Styleguide</NavLink></li>
          <li className="margin-right-small"><NavLink to="/dashboard" activeClassName="boxshadow-underline bold">Dashboard</NavLink></li>
          <li className="margin-right-small"><NavLink to="/paths" activeClassName="boxshadow-underline bold">Browse Paths</NavLink></li>
        </ul>
        {user.authenticated ? <a className={uiState.global.navMenuOpen ? '' : ''} href="/" onClick={e => toggleMenu(e, dispatch)} title="Menu">‌<img className="avatar circle-border subtle-border" src={user.avatar} alt="avatar" /></a> : null}
        {!user.authenticated ? <a className="button button--primary-clear uppercase" href="/" onClick={e => handleLoginClick(e, lock)} title="Login">L‌‌o‌‌g‌‌i‌‌n‌</a> : null}
      </nav>
      <div className={uiState.global.navMenuOpen ? 'menu absolute' : 'menu absolute hidden'}>
        <MenuCard username={user.name}>
          <ul className="list-style-none">
            <li><NavLink to="/profile" className="uppercase left" activeClassName="bold" onClick={() => toggleMenuAfterNav(dispatch)}><i className="fa fa-user h5 c-secondary margin-right-small" aria-hidden="true" /> Profile</NavLink></li>
            <li><a className="uppercase left" href="/logout"><i className="fa fa-sign-out h5 c-secondary margin-right-small" aria-hidden="true" />Logout</a></li>
          </ul>
        </MenuCard>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.shape),
  lock: PropTypes.objectOf(PropTypes.shape),
};

Header.defaultProps = {
  uiState: null,
  dispatch: null,
  user: null,
  lock: null,
};

export default Header;

