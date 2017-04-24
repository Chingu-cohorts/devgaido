import React, { Component, createElement } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import routes from './routes';

// Application components
// TODO: add application components

class App extends Component {
  render() {
    const routeComponents = routes.map(({ path, exact, component }, index) => (
      createElement(Route, { path, exact, component, key: index })
    ));
    return (
      <div>
        <h1>I AM APP!</h1>
        <BrowserRouter history={createBrowserHistory()}>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
            <Switch>
              {routeComponents}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
