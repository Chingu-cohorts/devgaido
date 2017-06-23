import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const handleStartNowClick = (e, lock) => {
  e.preventDefault();
  const options = {
    initialScreen: 'signUp',
  };
  lock.show(options);
};

const HomeContainer = (Component) => {
  class _HomeContainer extends React.Component {
    componentWillMount() {
      if (this.props.user.authenticated) {
        this.props.history.push('/dashboard');
      }
    }
    render() {
      return <Component {...this.props} />;
    }
  }
  _HomeContainer.propTypes = {
    user: PropTypes.objectOf(PropTypes.shape).isRequired,
    history: PropTypes.objectOf(PropTypes.shape).isRequired,
  };
  return _HomeContainer;
};


const Home = ({ lock }) => (
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
          <Link className="hero-cta-primary" to="/paths" onClick={e => handleStartNowClick(e, lock)}><i />&nbsp;&nbsp;SIGN UP NOW</Link>
          <Link className="hero-cta-secondary" to="/paths">&nbsp;&nbsp;EXPLORE PATHS</Link>
        </div>
      </div>
    </div>
  </div>
);

Home.propTypes = {
  lock: PropTypes.objectOf(PropTypes.shape),
};

Home.defaultProps = {
  lock: null,
};

export default HomeContainer(Home);
