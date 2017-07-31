import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from './App';
import store from './store';
import GAListener from './pages/shared/GAListener';

import './style/style.styl';

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
          <GAListener>
            <Component />
          </GAListener>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
  document.getElementById('root'),
  );
};

render(App);

if (module.hot) module.hot.accept('./App', () => render(App));
