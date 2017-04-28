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
      <Router {...routerProps}>
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
        </div>
      </Router>
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
