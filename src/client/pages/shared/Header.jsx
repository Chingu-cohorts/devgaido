import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () =>
  (
    <header>
    <div className="menu">
      <a className="menu-btn" href="#">Menu</a>
    </div>
    <div className="search-header">
      <label className="search">
        <input type="text" name="search" placeholder="Search"/>
      </label>
    </div>
  </header>
  );

export default Header;
