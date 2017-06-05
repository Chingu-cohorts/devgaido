import React from 'react';
import { NavLink } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';
import PropTypes from 'prop-types';
import { toggleNavMenu } from '../../actions/globalActions';

const lock = ({ domain, clientID, callbackURL }) => ((typeof window !== 'undefined') ? new Auth0Lock(clientID, domain, {
  auth: {
    redirectUrl: callbackURL,
    responseType: 'code',
    params: {
      scope: 'openid name email picture',
    },
  },
  theme: {
    logo: '/assets/img/profile2.svg',
    primaryColor: 'green',
  },
  languageDictionary: {
    title: 'devGaido',
  },
}) : null);

const handleLoginClick = (e, auth0) => {
  e.preventDefault();
  lock(auth0).show();
};

const toggleMenu = (e, dispatch) => {
  e.preventDefault();
  dispatch(toggleNavMenu());
};

const toggleMenuAfterNav = (dispatch) => {
  dispatch(toggleNavMenu());
};
// TODO: Change nav bar to be hidden on scroll down and visible on scroll up instead of just "fixed"
const Header = ({ user, uiState, dispatch, auth0 }) => (
  <div>
    <header>
      <div className="header-content">
        <NavLink to="/" className="header-logo" />
        <nav className="main-navigation">
          <ul className="menu">
            <li><NavLink to="/paths" activeClassName="link-active">Paths</NavLink></li>
            <li><NavLink to="/courses" activeClassName="link-active">Courses</NavLink></li>
            {user.authenticated ? <li><a className={uiState.global.navMenuOpen ? 'menu-btn profile menu-btn-close' : 'menu-btn profile'} href="/" onClick={e => toggleMenu(e, dispatch)} title="Menu">‌‌ Menu</a></li> : null}
            {!user.authenticated ? <li><a className="menu-btn login" href="/" onClick={e => handleLoginClick(e, auth0)} title="Login">L‌‌o‌‌g‌‌i‌‌n‌</a></li> : null}
          </ul>
        </nav>
        <div className={uiState.global.navMenuOpen ? 'side-panel is-visible' : 'side-panel'}>
          <div className="panel-menu">
            <h1>Welcome back, {user.name}</h1>
            <ul>
              <NavLink to="/profile" activeClassName="linkActive" onClick={() => toggleMenuAfterNav(dispatch)}><li className="information"><i className="fa fa-user-o" aria-hidden="true" />Your profile</li></NavLink>
              <a href="/logout"><li className="information"><i className="fa fa-sign-out" aria-hidden="true" />Logout</li></a>
            </ul>
          </div>
        </div>
        {/* <div className="search-header">
          <label className="search" htmlFor="search">
            <input type="text" name="search" placeholder="Search" />
          </label>
        </div>*/}
      </div>
    </header>
    {/*<div className="container" />*/}
  </div>
);

Header.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.shape),
  auth0: PropTypes.objectOf(PropTypes.shape),
};

Header.defaultProps = {
  uiState: null,
  dispatch: null,
  user: null,
  auth0: null,
};

export default Header;

