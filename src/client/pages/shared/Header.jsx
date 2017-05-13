import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
    this.menuClass = "side-panel";
  }
  toggleMenu(e) {
    e.preventDefault();
    this.state = {menuOpen: !this.state.menuOpen};
    this.forceUpdate();
    if(this.state.menuOpen) {
      this.menuClass = "side-panel is-visible";
    }
    else {
      this.menuClass = "side-panel";
    }
  }
  render() {
    return (
      <header>
        <div className="menu">
          <a className="menu-btn" href="#" onClick={e => this.toggleMenu(e)} >Menu</a>
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
            <h1>Welcome back Erik!</h1>
            
            <h2>Your learning path</h2>
            <ul>
              <li className="times"><i className="fa fa-calendar" aria-hidden="true"></i>Schedule</li>
              <li className="times"><i className="fa fa-graduation-cap" aria-hidden="true"></i>Lessons</li>
              <li><i className="fa fa-book" aria-hidden="true"></i>Resources</li>
            </ul>
            <h2>Your Settings</h2>
            <ul>
              <li className="information"><i className="fa fa-user-o" aria-hidden="true"></i>Your profile</li>
              <li><i className="fa fa-cog" aria-hidden="true"></i>Preferences</li>
              <li><i className="fa fa-flag" aria-hidden="true"></i>Notifications</li>
            </ul>
          </div>
        </div>
      </header>

    );
  }
}

export default Header;

