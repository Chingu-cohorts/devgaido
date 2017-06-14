import React from 'react';
import { Switch, withRouter } from 'react-router';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PropsRoute from './pages/shared/PropsRoute';

import Header from './pages/shared/Header';
import Footer from './pages/shared/Footer';

import routesArr from './routes';

const App = ({ serverMatch, dispatch, user, curriculum, uiState, auth0 }) => {
// If <App /> is rendered on the server we need to provide the serverMatch prop
// since StaticRouter can only render a single Route (Switch only works on client side).
// On the client though, just return all routes and let Switch do the work.
  const passdownProps = {
    dispatch, user, curriculum, uiState, auth0,
  };
  const routes = [];
  if (serverMatch) {
    routes.push(
      <PropsRoute
        {...serverMatch}
        key={0}
        passdownProps={passdownProps}
      />);
  } else {
    let key = 0;
    routesArr.forEach((route) => {
      routes.push(
        <PropsRoute
          {...route}
          key={key += 1}
          passdownProps={passdownProps}
        />);
    });
  }
  // TODO: Re-add sticky footer - position sticky or flexbox? (Check caniuse.com)
  return (
    <div className="App">
      <Header dispatch={dispatch} uiState={uiState} user={user} auth0={auth0} />
      <main>
        <div className="main">
          <Switch>
            {routes}
          </Switch>
        </div>
      </main>
      <Footer />
    </div>);
};

App.propTypes = {
  serverMatch: PropTypes.objectOf(PropTypes.shape),
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape),
  uiState: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func.isRequired,
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
