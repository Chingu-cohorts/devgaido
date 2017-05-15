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

  const routes = !match ? routesArr.map(({ path, exact, component, passdown }, index) => (
    createElement(SuperRoute, { path, exact, key: index, passdown, passdownProps: { user: props.user, learningPaths: props.learningPaths } },
      createElement(component),
    )
  )) : createElement(SuperRoute, {
    path: match.path, exact: match.exact, passdown: match.passdown, passdownProps: { user: props.user, learningPaths: props.learningPaths },
  }, createElement(match.component));

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
};

App.defaultProps = {
  serverMatch: null,
};

export default connect(store => ({
  user: store.user,
  learningPaths: store.learningPaths,
}))(App);
