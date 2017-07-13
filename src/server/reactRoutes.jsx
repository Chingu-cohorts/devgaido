/* eslint-disable no-underscore-dangle */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Helmet } from 'react-helmet';

import reducers from '../client/reducers';
import userReducer from '../client/reducers/userReducer';

import getCurriculum from './services/coreCurriculum';

import App from '../client/App';

import routes from '../client/routes';

const webRoot = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8081' : '';
const cssFile = (process.env.NODE_ENV !== 'production') ? '' : `<link rel="stylesheet" href="${webRoot}/style.css">`;

const renderPage = (reactMarkup, initialState, helmet) => `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      <meta charset="utf-8">
      <meta content="IE=Edge" http-equiv="X-UA-Compatible">
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/manifest.json">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
      <meta name="theme-color" content="#ffffff">
      ${cssFile}
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
      <div id="root">${reactMarkup}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};</script>
      <script src="${webRoot}/vendor.bundle.js"></script>
      <script src="${webRoot}/client.bundle.js"></script>
    </body>
  </html>
  `;

// We need to provide the serverMatch prop to <App /> since we are on the server side
// and can only render a single route with StaticRouter (Switch is not working like on client side)

export default (req, res, next) => {
  let match = null;
  routes.forEach((route) => {
    const tmp = matchPath(req.baseUrl, { path: route.path, exact: route.exact, strict: false });
    if (tmp) {
      match = { ...tmp, component: route.component, passdown: route.passdown };
    }
  });

  if (!match) {
    next();
  } else {
    const auth0 = {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:8080/callback',
    };

    const user = req.user ?
    {
      name: req.user.nickname,
      authenticated: true,
      email: req.user._json.email,
      avatar: req.user._json.picture,
    } : {
      name: '',
      authenticated: false,
      email: '',
      avatar: '',
    };

    const curriculum = getCurriculum();

    // TODO: Default Dashboard.currentPath to user.curPath
    const uiState = {
      global: {
        navMenuOpen: false,
      },
      Pages: {
        Library: {
          topic: 'All Topics',
          searchTerm: '',
        },
        Dashboard: {
          currentTab: 0,
        },
      },
    };
    // TODO: Think of an elegant way to do this here and apply it to ALL parts of the store
    const state = { user: { ...userReducer(undefined, { type: null }), ...user }, curriculum, auth0, uiState };
    const store = createStore(reducers, state);

    const initialView = renderToString(
      <Provider store={store}>
        <StaticRouter context={{}} location={match.url}>
          <App serverMatch={match} />
        </StaticRouter>
      </Provider>,
      );

    const helmet = Helmet.renderStatic();

    res.set('Content-Type', 'text/html')
    .status(200)
    .end(renderPage(initialView, state, helmet));
  }
};
