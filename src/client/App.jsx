import React, { createElement } from 'react';
import { Switch } from 'react-router';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SuperRoute from './pages/shared/SuperRoute';

import Header from './pages/shared/Header';
import Footer from './pages/shared/Footer';

import routesArr from './routes';

const App = (props) => {
// If <App /> is rendered on the server we need to provide the serverMatch prop
// since StaticRouter can only render a single Route (Switch only works on client side).
// On the client though, just return all routes and let Switch do the work.

  const match = props.serverMatch;

  const routes = [];

  if (match) {
    routes.push(
      <SuperRoute
        {...match}
        key={0}
        passdownProps={{
          user: props.user,
          learningPath: props.learningPath,
        }}
      >
        {createElement(match.component)}
      </SuperRoute>);
  } else {
    let key = 0;
    routesArr.forEach((route) => {
      routes.push(
        <SuperRoute
          {...route}
          key={key += 1}
          passdownProps={{ user: props.user, learningPath: props.learningPath }}
        >
          {createElement(route.component)}
        </SuperRoute>);
    });
  }

  return (
    <div className="App">
      <Header />
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
  learningPath: PropTypes.objectOf(PropTypes.shape),
};

App.defaultProps = {
  serverMatch: null,
  learningPath: [],
};

export default connect(store => ({
  user: store.user,
  learningPath: store.learningPath,
}))(App);
