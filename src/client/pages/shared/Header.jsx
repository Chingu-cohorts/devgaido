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

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.menuClass = 'side-panel';
  }
  toggleMenu(e) {
    e.preventDefault();
    this.state = { menuOpen: !this.state.menuOpen };
    this.forceUpdate();
    if (this.state.menuOpen) {
      this.menuClass = 'side-panel is-visible';
    } else {
      this.menuClass = 'side-panel';
    }
  }
  render() {
    return (
      <header>
        <div className="menu">
          <a className="menu-btn" href="#" onClick={e => this.toggleMenu(e)} >Menu</a>
        </div>
        <div>
          <a href="#" onClick={e => handleClick(e)}>Login</a>
          <a href="/logout">Logout</a>
        </div>
        <div className="search-header">
          <label className="search">
            <input type="text" name="search" placeholder="Search" />
          </label>
        </div>
        <div className={this.menuClass}>
          <div className="panel-links">
            <a className="side-panel-close" href="#">Close</a>
          </div>
          <div className="panel-menu">
            <h2>Your learning path</h2>
            <ul>
              <li className="times"><i className="fa fa-calendar" aria-hidden="true" />Schedule</li>
              <li className="times"><i className="fa fa-graduation-cap" aria-hidden="true" />Lessons</li>
              <li><i className="fa fa-book" aria-hidden="true" />Resources</li>
            </ul>
            <h2>Your Settings</h2>
            <ul>
              <li className="information"><i className="fa fa-user-o" aria-hidden="true" />Your profile</li>
              <li><i className="fa fa-cog" aria-hidden="true" />Preferences</li>
              <li><i className="fa fa-flag" aria-hidden="true" />Notifications</li>
            </ul>
          </div>
        </div>
      </header>

    );
  }
}

export default Header;

