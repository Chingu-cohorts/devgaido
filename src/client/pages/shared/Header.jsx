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
const Header = ({ user, uiState, dispatch, auth0, history }) => (
  <div>
    <header>
      <div className="header-content lostContainerHeader">
        <NavLink to="/" className="headerLogo" />
        <nav>
          <ul>
            <NavLink to="/courses" activeClassName="linkActive"><li>Courses</li></NavLink>
            <NavLink to="/dashboard" activeClassName="linkActive"><li>Dashboard</li></NavLink>
          </ul>
        </nav>
        <div className="menu putRight">
          {user.authenticated ? <a className={uiState.global.navMenuOpen ? 'menu-btn menu-btn-close' : 'menu-btn'} href="/" onClick={e => toggleMenu(e, dispatch)} title="Menu">‌‌ </a> : null}
          {!user.authenticated ? <a className="loginButton" href="/" onClick={e => handleLoginClick(e, auth0)} title="Login"><i className="fa fa-sign-in" aria-hidden="true" />‌‌ ‌‌L‌‌o‌‌g‌‌i‌‌n‌</a> : null}
        </div>
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
      <div className="backLinkDiv">
        <button className="backLink" href="#" onClick={() => history.goBack()}>&larr; Back</button>
      </div>
    </header>
    <div className="constrained" />
  </div>
);

Header.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.shape),
  auth0: PropTypes.objectOf(PropTypes.shape),
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

Header.defaultProps = {
  uiState: null,
  dispatch: null,
  user: null,
  auth0: null,
};

export default Header;

