import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () =>
  (
    <header>
      <div className="constrained">
        <NavLink to="/" exact>
          <div className="logoText"><span>dev</span><span>Gaido</span></div>
        </NavLink>
        <nav>
          <ul>
            <li><NavLink to="/login" activeClassName="navItemActive">Login</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );

export default Header;
