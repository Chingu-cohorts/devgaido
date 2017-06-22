import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => (
  <div>
    <div className="home-hero">
      <div className="home-content">
        <h1 className="hero-tagline">LEARN WEB DEVELOPMENT</h1>
        <h1 className="hero-tagline hero-tagline-colored">THE DEVGAIDO WAY</h1>
        <div className="hero-details">
          <h2>Whether you&#039;re just starting out or want to brush up a certain skill:</h2>
          <h2><span className="hero-tagline-colored">DevGaido</span> provides easy to follow learning paths that help you reach your goal without the hassle.</h2>
          <h2>Never worry about learning the wrong stuff from subpar resources ever again!</h2>
        </div>
        <div className="hero-cta-div">
          <NavLink className="hero-cta-primary" to="/paths"><i />&nbsp;&nbsp;START NOW</NavLink>
          <NavLink className="hero-cta-secondary" to="/paths">&nbsp;&nbsp;EXPLORE PATHS</NavLink>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
