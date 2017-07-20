import React from 'react';
import { Switch, withRouter } from 'react-router';
import Helmet from 'react-helmet';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CSSTransitionGroup } from 'react-transition-group';


import PropsRoute from './pages/shared/PropsRoute';
import Auth0LockWidget from './pages/shared/Auth0LockWidget';

import Header from './pages/shared/Header';
import Footer from './pages/shared/Footer';
import routesArr from './routes';

const App = ({ serverMatch, location, user, curriculum, uiState, auth0 }) => {
// If <App /> is rendered on the server we need to provide the serverMatch prop
// since StaticRouter can only render a single Route (Switch only works on client side).
// On the client though, just return all routes and let Switch do the work.
  const lock = Auth0LockWidget(auth0);
  const passdownProps = {
    user, curriculum, uiState, auth0, lock,
  };
  const routes = [];
  if (serverMatch) {
    routes.push(
      <PropsRoute
        {...serverMatch}
        key={0}
        passdownProps={passdownProps}
        location={location}
      />);
  } else {
    let key = 0;
    routesArr.forEach((route) => {
      routes.push(
        <PropsRoute
          {...route}
          key={key += 1}
          passdownProps={passdownProps}
          location={location}
        />);
    });
  }
  return (
    <div className="App">
      <Helmet
        htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
        titleTemplate="devGaido | %s"
        titleAttributes={{ itemprop: 'name', lang: 'en' }}
        meta={[
          { name: 'description', content: 'devGaido provides easy to follow learning paths that help you become a web developer without the hassle.' },
        ]}
      />
      <Header uiState={uiState} user={user} lock={lock} auth0={auth0} />
      <div className="page-content relative overflow-hidden"> {/* For sticky footer and background color */}
        <CSSTransitionGroup
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
          transitionName="page-transition"
        >
          <Switch key={location.pathname} location={location}>
            {routes}
          </Switch>
        </CSSTransitionGroup>
      </div>
      <Footer />
    </div>);
};

App.propTypes = {
  serverMatch: PropTypes.objectOf(PropTypes.shape),
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape),
  uiState: PropTypes.objectOf(PropTypes.shape),
  location: PropTypes.objectOf(PropTypes.shape).isRequired,
  auth0: PropTypes.objectOf(PropTypes.shape).isRequired,

};

App.defaultProps = {
  serverMatch: null,
  curriculum: [],
  uiState: null,
};
// Without "withRouter" when using connect routes don't actually change
// Maybe this is just a workaround so check back later maybe.
// TODO: Get rid of withRouter?
export default withRouter(connect(store => ({
  user: store.user,
  curriculum: store.curriculum,
  uiState: store.uiState,
  auth0: store.auth0,
}))(App));
