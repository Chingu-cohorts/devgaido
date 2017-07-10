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
    <div className="home-hero flex align-items-center justify-center bg-img__compass bg-cover">
      <div className="flex flex-wrap width-50">
        <h1 className="c-white bold width-100">LEARN WEB DEVELOPMENT</h1>
        <h1 className="c-secondary bold margin-bottom-big width-100">THE DEVGAIDO WAY</h1>
        <p className="c-white">Whether you&#039;re just starting out or want to brush up a certain skill:</p>
        <p className="c-white"><span className="c-secondary">DevGaido</span> provides easy to follow learning paths that help you reach your goal without the hassle.</p>
        <p className="c-white">Never worry about learning the wrong stuff from subpar resources ever again!</p>
        <div className="margin-top-small width-100">
          <Link className="button button--primary margin-right-small uppercase" to="/paths" onClick={e => handleStartNowClick(e, lock)}><i />Sign Up Now</Link>
          <Link className="button button--white-clear uppercase" to="/paths">Explore Library</Link>
        </div>
      </div>
    </div>
    <div className="container">
      <section className="flex margin-top-huge">
        <img className="border-round" src="/img/discover.jpg" alt="" />
        <div className="flex-1 margin-left-small margin-top-small">
          <h1 className="c-secondary bold">Discover</h1>
          <p className="width-50">Whether you are a new Web Developer seeking to gain broader skills or an experienced developer who wants to fill a specific gap - let devGaido help you discover what you need to know.</p>
        </div>
      </section>
      <section className="flex margin-top-huge">
        <div className="flex-1 margin-right-small margin-top-small right">
          <h1 className="c-primary bold right">Learn</h1>
          <p className="width-50 margin-left-auto">Follow a learning path that is geared to what you want and need to know to become a better Web Developer. We&#039;ve done the work of plotting a course to your goals so you can focus on learning.</p>
        </div>
        <img className="border-round" src="/img/learn.jpg" alt="" />
      </section>
      <section className="flex margin-top-huge">
        <img className="border-round" src="/img/practise.jpg" alt="" />
        <div className="flex-1 margin-left-small margin-top-small">
          <h1 className="c-secondary bold">Practice</h1>
          <p className="width-50">Practice makes perfect! devGaido&#039;s learning paths include strategically placed exercises and quizzes so you can reinforce your newfound knowledge and understanding.</p>
        </div>
      </section>
      <section className="flex margin-top-huge margin-bottom-huge">
        <div className="flex-1 margin-right-small margin-top-small right">
          <h1 className="c-primary bold right">Build</h1>
          <p className="width-50 margin-left-auto">Challenges and projects are included to help you achieve a deep and comprehensive understanding of how to use the languages, libraries, tools, and techniques necessary to be a Web Developer.</p>
        </div>
        <img className="border-round" src="/img/build.jpg" alt="" />
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
