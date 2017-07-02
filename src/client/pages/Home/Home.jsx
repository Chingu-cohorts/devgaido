import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Redirect from '../shared/Redirect';

const handleStartNowClick = (e, lock) => {
  e.preventDefault();
  const options = {
    initialScreen: 'signUp',
  };
  lock.show(options);
};

const Home = ({ lock }) => (
  <div>
    <div className="home-hero">
      <div className="home-content">
        <h1 className="hero-tagline">LEARN WEB DEVELOPMENT</h1>
        <h1 className="hero-tagline hero-tagline-colored">THE DEVGAIDO WAY</h1>
        <div className="hero-details">
          <p>Whether you&#039;re just starting out or want to brush up a certain skill:</p>
          <p><span className="hero-tagline-colored">DevGaido</span> provides easy to follow learning paths that help you reach your goal without the hassle.</p>
          <p>Never worry about learning the wrong stuff from subpar resources ever again!</p>
        </div>
        <div className="hero-cta-div">
          <Link className="button button-pill button-secondary hero-cta" to="/paths" onClick={e => handleStartNowClick(e, lock)}><i />&nbsp;&nbsp;SIGN UP NOW</Link>
          <Link className="button button-pill button-almost-clear hero-cta" to="/paths">&nbsp;&nbsp;EXPLORE PATHS</Link>
        </div>
      </div>
    </div>
    <div className="container">
      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Imagine that there was content here!</h1>
    </div>
  </div>
);

Home.propTypes = {
  lock: PropTypes.objectOf(PropTypes.shape),
};

Home.defaultProps = {
  lock: null,
};

export default Redirect(Home, true, '/dashboard');
