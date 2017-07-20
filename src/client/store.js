/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';

import logger from 'redux-logger';

import reducers from './reducers';

const getHydratedStore = () => {
  let preloadedState = {};

  if (window.__INITIAL_STATE__) {
    preloadedState = { ...window.__INITIAL_STATE__ };
  }
  delete window.__INITIAL_STATE__;

  const middleware = [];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
  }

  // Use Redux Dev Tools, if available
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = middleware ?
    createStore(reducers, preloadedState, composeEnhancers(applyMiddleware(...middleware))) :
    createStore(reducers, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return store;
};

const store = getHydratedStore();

export default store;
