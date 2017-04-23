import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
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
        <BrowserRouter history={createBrowserHistory()}>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
