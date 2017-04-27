import React, { Component } from 'react';
import { Switch } from 'react-router';
import PropTypes from 'prop-types';

import Header from './pages/shared/Header';
import Footer from './pages/shared/Footer';

// Application components

// TODO: Make it so, that this would work in index.jsx:
/*      ...
        <Component routes={routeComponents}>
          <BrowserRouter history={createBrowserHistory()} />
        </Component>
        ...
*/

class App extends Component {
  render() {
    const Router = this.props.router;
    const routerProps = this.props.routerProps;
    const routes = this.props.routes;

    return (
      <div>
        <Router {...routerProps}>
          <div>
            <Header />
            <Switch>
              {routes}
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  router: PropTypes.func.isRequired,
  routerProps: PropTypes.objectOf(PropTypes.shape).isRequired,
  routes: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.shape),
    PropTypes.arrayOf(PropTypes.objectOf((PropTypes.shape))),
  ]).isRequired,
};

export default App;
