import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toggleNavMenu } from '../../actions/globalActions';

const handleLoginClick = (e, lock) => {
  e.preventDefault();
  console.log(lock)
  var options = {
  initialScreen: 'signUp'
};
  lock.show(options);
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
  <div>
    <header>
      <div className="header-content">
        <NavLink to="/" className="header-logo" />
        <nav className="main-navigation">
          <ul className="menu">
            <li><NavLink to="/dashboard" activeClassName="link-active">Dashboard</NavLink></li>
            <li><NavLink to="/paths" activeClassName="link-active">Browse Paths</NavLink></li>
            {user.authenticated ? <li><a className={uiState.global.navMenuOpen ? 'menu-btn profile menu-btn-close' : 'menu-btn profile'} href="/" onClick={e => toggleMenu(e, dispatch)} title="Menu">‌‌ Menu</a></li> : null}
            {!user.authenticated ? <li><a className="menu-btn login" href="/" onClick={e => handleLoginClick(e, lock)} title="Login">L‌‌o‌‌g‌‌i‌‌n‌</a></li> : null}
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
  </div>
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

