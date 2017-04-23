import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import Home from './pages/Home';
import Login from './pages/Login';

// Application components
// TODO: add application components

class App extends Component {
  render() {
    return (
      <div>
        <h1>I AM APP!</h1>
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
