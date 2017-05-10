import React from 'react';
// import { NavLink } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';

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

const handleClick = (e) => {
  e.preventDefault();
  lock.show();
};

const Header = () =>
  (
    <header>
      <div>
        <a href="#" onClick={e => handleClick(e)}>Login</a>
      </div>
      <div>
        <a href="/logout">Logout</a>
      </div>
      <div className="menu">
        <a className="menu-btn" href="#">Menu</a>
      </div>
      <div className="search-header">
        <label className="search">
          <input type="text" name="search" placeholder="Search" />
        </label>
      </div>
    </header>
  );

export default Header;
