import React, { createElement } from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';

import Header from './pages/shared/Header';
import Footer from './pages/shared/Footer';

import routesArr from './routes';

const App = (props) => {
// If <App /> is rendered on the server we need to provide the serverMatch prop
// since StaticRouter can only render a single Route (Switch only works on client side).
// On the client though, just return all routes and let Switch do the work.

  const match = props.serverMatch;

  const routes = !match ? routesArr.map(({ path, exact, component }, index) => (
      createElement(Route, { path, exact, component, key: index })
    )) : createElement(Route, {
      path: match.path, exact: match.exact, component: match.component,
    });

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

export default App;
