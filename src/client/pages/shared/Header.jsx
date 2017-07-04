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
    <div className="container flex justify-space-between align-items-center padding-vert-tiny relative">
      <NavLink to="/" className="logo" />
      <nav className="main-navigation">
        <ul className="menu flex justify-content-center">
          <li><NavLink to="/styleguide" activeClassName="link-active bold">Styleguide</NavLink></li>
          <li><NavLink to="/dashboard" activeClassName="link-active bold">Dashboard</NavLink></li>
          <li><NavLink to="/paths" activeClassName="link-active bold">Browse Paths</NavLink></li>
          {user.authenticated ? <a className={uiState.global.navMenuOpen ? '' : ''} href="/" onClick={e => toggleMenu(e, dispatch)} title="Menu">‌<img className="avatar circle-border subtle-border" src={user.avatar} alt="avatar" /></a> : null}
          {!user.authenticated ? <li><a className="button button-pill button-login" href="/" onClick={e => handleLoginClick(e, lock)} title="Login">L‌‌o‌‌g‌‌i‌‌n‌</a></li> : null}
        </ul>
      </nav>
      <div className={uiState.global.navMenuOpen ? 'absolute sidething' : 'absolute sidething hidden'}>
        <MenuCard username={user.name}>
          <ul className="list-style-none no-margin">
            <li><NavLink to="/profile" className="uppercase left" activeClassName="bold" onClick={() => toggleMenuAfterNav(dispatch)}><i className="fa fa-user h5 c-secondary margin-right-small" aria-hidden="true" /> Profile</NavLink></li>
            
            <li><a className="uppercase left" href="/logout"><i className="fa fa-sign-out h5 c-secondary margin-right-small" aria-hidden="true" />Logout</a></li>
          </ul>
        </MenuCard>
      </div>
      {/*<div className={uiState.global.navMenuOpen ? 'absolute sidething bg-white' : 'absolute sidething hidden'}>
        <div className="">
          <h5 className="c-secondary">Welcome back, {user.name}</h5>
          <ul>
            <NavLink to="/profile" activeClassName="linkActive" onClick={() => toggleMenuAfterNav(dispatch)}><li className="information"><i className="fa fa-user-o" aria-hidden="true" />Your profile</li></NavLink>
            <a href="/logout"><li className="information"><i className="fa fa-sign-out" aria-hidden="true" />Logout</li></a>
          </ul>
        </div>
      </div>*/}
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

