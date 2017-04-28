import React, { createElement } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router';
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
import './stylus/style.styl';
import routes from './routes';


const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') middleware.push(logger);

const store = createStore(reducer, applyMiddleware(...middleware));
const root = document.getElementById('root');

const routeComponents = routes.map(({ path, exact, component }, index) => (
      createElement(Route, { path, exact, component, key: index })
    ));

const hotRender = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component
          router={BrowserRouter}
          routerProps={{ history: createBrowserHistory() }}
          routes={routeComponents}
        />
      </Provider>
    </AppContainer>,
  root,
  );
};

hotRender(App);

if (module.hot) module.hot.accept('./App', () => hotRender(App));
