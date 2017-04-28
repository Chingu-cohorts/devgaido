import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () =>
  (
    <header>
      <div className="constrained">
        <div className="logoText"><span>dev</span><span>Gaido</span></div>
        <nav>
          <ul>
            <li><NavLink to="/" exact activeClassName="navItemActive">Home</NavLink></li>
            <li><NavLink to="/login" activeClassName="navItemActive">Login</NavLink></li>
            <li><NavLink to="/register" activeClassName="navItemActive">Register</NavLink></li>
            <li><NavLink to="/courses" activeClassName="navItemActive">Course Catalog</NavLink></li>
            <li><NavLink to="/dashboard" activeClassName="navItemActive">Dashboard</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );

export default Header;
