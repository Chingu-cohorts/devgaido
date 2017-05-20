import React from 'react';
import { NavLink } from 'react-router-dom';
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
    this.menuButtonClass = 'menu-btn';
  }
  toggleMenu(e) {
    e.preventDefault();
    this.state = { menuOpen: !this.state.menuOpen };
    this.forceUpdate();
    if (this.state.menuOpen) {
      this.menuClass = 'side-panel is-visible';
      this.menuButtonClass = 'menu-btn menu-btn-close';
    } else {
      this.menuClass = 'side-panel';
      this.menuButtonClass = 'menu-btn';
    }
  }
  render() {
    return (
      <div>
        <header>
          <div className="header-content">
            <div className="menu">
              {/* There is an invisible ascii char as content in the anchor tags!
              TODO: Change anchor tags to buttons! (and shift button tag styling to .button class */}
              <a className={this.menuButtonClass} href="/" onClick={e => this.toggleMenu(e)} title="Menu">‌‌ </a>
              <a className="login" href="/" onClick={e => handleClick(e)} title="Login">‌‌ </a>
              <a className="hidden" href="/logout" title="Logout">‌‌ </a>
            </div>
            <div className="search-header">
              <label className="search" htmlFor="search">
                <input type="text" name="search" placeholder="Search" />
              </label>
            </div>
          </div>
        </header>
        <div className={this.menuClass}>
          <div className="panel-menu">
            <h1>Welcome back Erik!</h1>
            <ul>
              <li><NavLink to="/" activeClassName="linkActive" exact><i className="fa fa-graduation-cap" aria-hidden="true" />Home</NavLink></li>
              <li><NavLink to="/paths" activeClassName="linkActive"><i className="fa fa-graduation-cap" aria-hidden="true" />Paths</NavLink></li>
              <li><NavLink to="/courses" activeClassName="linkActive"><i className="fa fa-graduation-cap" aria-hidden="true" />Courses</NavLink></li>
            </ul>
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
      </div>

    );
  }
}

export default Header;

