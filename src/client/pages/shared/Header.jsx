import React from 'react';
import { NavLink } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';
import PropTypes from 'prop-types';
import { toggleNavMenu } from '../../actions/globalActions';
// Only use on client side
const lock = (typeof window !== 'undefined') ? new Auth0Lock('L90m0rEGvEWnCkQOBYE3U30J6m68HDIb', 'devgaido.auth0.com',
  {
    auth: {
      redirectUrl: 'http://localhost:8080/callback',
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
  }) : null;

const handleLoginClick = (e) => {
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
const Header = ({ user, uiState, dispatch }) => (
  <div>
    <header>
      <div className="header-content lostContainerHeader">
        <NavLink to="/" className="headerLogo" />
        <div className="menu putRight">
          {/* There is an invisible ascii char as content in the anchor tags!
          TODO: Change anchor tags to buttons! (and shift button tag styling to .button class */}
          <a className={uiState.global.navMenuOpen ? 'menu-btn menu-btn-close' : 'menu-btn'} href="/" onClick={e => toggleMenu(e, dispatch)} title="Menu">‌‌ </a>
          <a className="login" href="/" onClick={e => handleLoginClick(e)} title="Login">‌‌ </a>
          <a className="hidden" href="/logout" title="Logout">‌‌ </a>
        </div>
        <div className={uiState.global.navMenuOpen ? 'side-panel is-visible' : 'side-panel'}>
          <div className="panel-menu">
            <h1>Welcome back, {user.name}</h1>
            <ul>
              <NavLink to="/" activeClassName="linkActive" exact onClick={() => toggleMenuAfterNav(dispatch)} ><li><i className="fa fa-graduation-cap" aria-hidden="true" />Home</li></NavLink>
              <NavLink to="/paths" activeClassName="linkActive" onClick={() => toggleMenuAfterNav(dispatch)}><li><i className="fa fa-graduation-cap" aria-hidden="true" />Paths</li></NavLink>
              {/* <li><NavLink to="/courses" activeClassName="linkActive"
                  onClick={() => toggleMenuAfterNav(dispatch)}>
                  <i className="fa fa-graduation-cap" aria-hidden="true" />Courses
                </NavLink></li>*/}
            </ul>
            {/* <h2>Your learning path</h2>
            <ul>
              <li className="times"><i className="fa fa-calendar" aria-hidden="true" />Schedule</li>
              <li className="times">
                <i className="fa fa-graduation-cap" aria-hidden="true" />Lessons
              </li>
              <li><i className="fa fa-book" aria-hidden="true" />Resources</li>
            </ul>*/}
            <h2>Your Settings</h2>
            <ul>
              <NavLink to="/profile" activeClassName="linkActive" onClick={() => toggleMenuAfterNav(dispatch)}><li className="information"><i className="fa fa-user-o" aria-hidden="true" />Your profile</li></NavLink>
              {/* <li><i className="fa fa-cog" aria-hidden="true" />Preferences</li>
              <li><i className="fa fa-flag" aria-hidden="true" />Notifications</li>*/}
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
    <div className="constrained" />
  </div>
);

Header.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.shape),
};

Header.defaultProps = {
  uiState: null,
  dispatch: null,
  user: null,
};

export default Header;

