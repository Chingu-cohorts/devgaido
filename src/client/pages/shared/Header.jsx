import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toggleNavMenu } from '../../actions/globalActions';

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
    <div className="container flex justify-space-between align-items-center padding-vert-tiny">
      <NavLink to="/" className="logo" />
      <nav className="main-navigation">
        <ul className="menu flex justify-content-center">
          <li><NavLink to="/styleguide" activeClassName="link-active">Styleguide</NavLink></li>
          <li><NavLink to="/dashboard" activeClassName="link-active">Dashboard</NavLink></li>
          <li><NavLink to="/paths" activeClassName="link-active">Browse Paths</NavLink></li>
          {user.authenticated ? <a className={uiState.global.navMenuOpen ? '' : ''} href="/" onClick={e => toggleMenu(e, dispatch)} title="Menu">‌<img className="avatar circle-border subtle-border" src={user.avatar} alt="avatar" /></a> : null}
          {!user.authenticated ? <li><a className="button button-pill button-login" href="/" onClick={e => handleLoginClick(e, lock)} title="Login">L‌‌o‌‌g‌‌i‌‌n‌</a></li> : null}
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

