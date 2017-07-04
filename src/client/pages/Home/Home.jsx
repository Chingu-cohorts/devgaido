import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Redirect from '../shared/Redirect';

const handleStartNowClick = (e, lock) => {
  e.preventDefault();
  lock.show({ initialScreen: 'signUp' });
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
          <Link className="button button-pill button-primary hero-cta" to="/paths" onClick={e => handleStartNowClick(e, lock)}><i />SIGN UP NOW</Link>
          <Link className="button button-pill button-almost-clear hero-cta" to="/paths">EXPLORE PATHS</Link>
        </div>
      </div>
    </div>
    <div className="container">
      <section className="flex margin-top-big">
        <img className="round-border" src="https://images.pexels.com/photos/297755/pexels-photo-297755.jpeg?h=350&auto=compress&cs=tinysrgb" alt="" />
        <div className="flex-1 margin-left-small margin-top-small">
          <h1 className="c-secondary bold">Discover</h1>
          <p className="width-50">Whether you are a new Web Developer seeking to gain broader skills or an experienced developer who wants to fill a specific gap - let devGaido help you discover what you need to know.</p>
        </div>
      </section>
      <section className="flex margin-top-big">
        <div className="flex-1 margin-right-small margin-top-small right">
          <h1 className="c-primary bold right">Learn</h1>
          <p className="width-50 margin-left-auto">Follow a learning path that is geared to what you want and need to know to become a better Web Developer. We've done the work of plotting a course to your goals so you can focus on learning.</p>
        </div>
        <img className="round-border" src="https://images.pexels.com/photos/232/apple-iphone-books-desk.jpg?h=350&auto=compress&cs=tinysrgb" alt="" />
      </section>
      <section className="flex margin-top-big">
        <img className="round-border" src="https://images.pexels.com/photos/48620/pexels-photo-48620.jpeg?h=350&auto=compress&cs=tinysrgb" alt="" />
        <div className="flex-1 margin-left-small margin-top-small">
          <h1 className="c-secondary bold">Practice</h1>
          <p className="width-50">Practice makes perfect! devGaido's learning paths include strategically placed exercises and quizzes so you can reinforce your newfound knowledge and understanding.</p>
        </div>
      </section>
      <section className="flex margin-top-big margin-bottom-big">
        <div className="flex-1 margin-right-small margin-top-small right">
          <h1 className="c-primary bold right">Build</h1>
          <p className="width-50 margin-left-auto">Challenges and projects are included to help you achieve a deep and comprehensive understanding of how to use the languages, libraries, tools, and techniques necessary to be a Web Developer.</p>
        </div>
        <img className="round-border" src="https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?h=350&auto=compress&cs=tinysrgb" alt="" />
      </section>
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
