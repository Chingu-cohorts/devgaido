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
import reducer from './reducers';
import App from './App';

// import './style.css';
import './stylus/style.css';

const getInitialStore = () => {
  let initialStore = {};

  if (window.__INITIAL_STORE__) {
    initialStore = { ...window.__INITIAL_STORE__ };
  }
  delete window.__INITIAL_STORE__;
  return initialStore;
};

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') middleware.push(logger);

const store = createStore(reducer, getInitialStore(), applyMiddleware(...middleware));

console.log('STORE.GETSTATE:', store.getState());
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
