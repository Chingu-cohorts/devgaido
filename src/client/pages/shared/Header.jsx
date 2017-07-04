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
      <NavLink to="/" className="logo h2 no-margin"><span>dev</span><span>Gaid</span>
        <span className="relative">
          <svg className="logo__compass absolute" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414">
            <path d="M10 0c5.52 0 10 4.48 10 10s-4.48 10-10 10S0 15.52 0 10 4.48 0 10 0zm0 3.154c3.78 0 6.846 3.067 6.846 6.846 0 3.78-3.067 6.846-6.846 6.846-3.78 0-6.846-3.067-6.846-6.846 0-3.78 3.067-6.846 6.846-6.846z" fill="#d16c4b" />
            <path d="M14.023 5.977l-5.62 2.426-2.426 5.62 5.62-2.426 2.426-5.62zm-3.077 3.077c.522.522.522 1.37 0 1.892-.522.522-1.37.522-1.892 0-.522-.522-.522-1.37 0-1.892.522-.522 1.37-.522 1.892 0z" fill="#d16c4b" />
          </svg>
        </span>
      </NavLink>
      <nav className="main-navigation">
        <ul className="menu">
          <li><NavLink to="/styleguide" activeClassName="link-active">Styleguide</NavLink></li>
          <li><NavLink to="/dashboard" activeClassName="link-active">Dashboard</NavLink></li>
          <li><NavLink to="/paths" activeClassName="link-active">Browse Paths</NavLink></li>
          {user.authenticated ? <li><a className={uiState.global.navMenuOpen ? 'menu-btn profile menu-btn-close' : 'menu-btn profile'} href="/" onClick={e => toggleMenu(e, dispatch)} title="Menu">‌‌ Menu</a></li> : null}
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

