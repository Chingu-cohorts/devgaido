/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import reducers from './reducers';
import App from './App';

import './stylus/style.styl';

/**
 * Get the initial application state which is either an empty object or the
 * state previously stored in window.__INITIAL_STATE__.
 *
 * @returns {Object} initialStore - The initial app state
 */
const getInitialState = () => {
  let initialStore = {};

  if (window.__INITIAL_STATE__) {
    initialStore = { ...window.__INITIAL_STATE__ };
  }
  delete window.__INITIAL_STATE__;
  return initialStore;
};

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') middleware.push(logger);

const store = createStore(reducers, getInitialState(), applyMiddleware(...middleware));
if (store.getState().user.name !== '') {
  console.log('Hello', store.getState().user.name);
}


/**
 * Build the template for all pages in the application
 *
 * @param {any} Component - React Component containing on the page
 * @returns {null} -
 */
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter history={createBrowserHistory()}>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
  document.getElementById('root'),
  );
};

render(App);

if (module.hot) module.hot.accept('./App', () => render(App));
