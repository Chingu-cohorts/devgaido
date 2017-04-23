import React, { Component } from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import getRoutes from './routes';

// Application components
// TODO: add application components

class App extends Component {
  render() {
    return (
      <Router children={getRoutes()} history={createBrowserHistory()}>
        <div className="App">
          <h1>Hello DevGaido World!</h1>
        </div>
      </Router>
    );
  }
}

export default App;