/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import StickyNav from './StickyNav';


// TODO: Change nav bar to be hidden on scroll down and visible on scroll up instead of just "fixed"
const Header = ({ user, uiState, lock, history }) => (
  <header>
    <StickyNav
      user={user}
      uiState={uiState}
      lock={lock}
      history={history}
    />
    {/* <div className="container flex justify-space-between align-items-center padding-vertical-small relative">
      <NavLink to={user.authenticated ? '/dashboard' : '/'} className="logo" />
      <nav className="flex align-items-center">
        <ul className="flex align-items-center no-margin list-style-none uppercase">
          <li className="margin-right-small"><NavLink to="/library" activeClassName="boxshadow-underline bold">Library</NavLink></li>
          {user.authenticated ? <li className="margin-right-small"><NavLink to="/dashboard" activeClassName="boxshadow-underline bold">Dashboard</NavLink></li> : null}
        </ul>
        {user.authenticated ? <img className="avatar circle-border subtle-border cursor-pointer" src={user.avatar} alt="avatar" role="button" onClick={() => toggleNavMenu()} /> : null}
        {!user.authenticated ? <a className="button button--primary-clear uppercase" href="/" onClick={e => handleLoginClick(e, lock)} title="Login">L‌‌o‌‌g‌‌i‌‌n‌</a> : null}
      </nav>
      <div className={uiState.global.navMenuOpen ? 'menu absolute' : 'menu absolute hidden'}>
        <MenuCard username={user.name}>
          <ul className="list-style-none no-margin">
            <li className="margin-bottom-small"><NavLink to="/profile" className="uppercase left" activeClassName="bold" onClick={() => toggleNavMenu()}><i className="fa fa-user h5 c-secondary margin-right-small" aria-hidden="true" /> Profile</NavLink></li>
            <li><a className="uppercase left" href="/logout"><i className="fa fa-sign-out h5 c-secondary margin-right-small" aria-hidden="true" />Logout</a></li>
          </ul>
        </MenuCard>
      </div>
    </div>*/}
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

