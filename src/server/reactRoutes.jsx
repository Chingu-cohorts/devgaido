/* eslint-disable no-underscore-dangle */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Helmet } from 'react-helmet';

import db from './db';
import reducers from '../client/reducers';
import getCurriculum from './services/coreCurriculum';
import App from '../client/App';
import routes from '../client/routes';

const webRoot = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8081' : '';
const cssFile = (process.env.NODE_ENV !== 'production') ? '' : `<link rel="stylesheet" href="${webRoot}/style.css">`;

const renderPage = (match, store) => {
  const reactMarkup = renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={match.url}>
        <App serverMatch={match} />
      </StaticRouter>
    </Provider>,
    );

  const helmet = Helmet.renderStatic();

  return `
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
      <link href="https://fonts.googleapis.com/css?family=Fira+Sans:300,400,700" rel="stylesheet">
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    </head>
    <body>
      <div id="root">${reactMarkup}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')};</script>
      <script src="${webRoot}/vendor.bundle.js"></script>
      <script src="${webRoot}/client.bundle.js"></script>
    </body>
  </html>
  `;
};

const sendGuestPage = (res, match, auth0) => {
  const curriculum = getCurriculum();

  const state = { curriculum, auth0 };
  const store = createStore(reducers, state);

  res.set('Content-Type', 'text/html')
      .status(200)
      .end(renderPage(match, store));
};

const sendAuthenticatedPage = (res, req, match, auth0) => {
  const persistentData = {
    id: req.user.id,
    data: [],
  };

  const user = {
    name: req.user.nickname,
    authenticated: true,
    email: req.user._json.email,
    avatar: req.user._json.picture,
    curPathId: '',
    persistentData,
  };

  const curriculum = getCurriculum();

  db.find({ _id: req.user.id }, (docs) => {
    if (docs) {
      user.persistentData.id = docs[0]._id;
      user.persistentData.data = docs[0].data;
    }
    const state = { user, curriculum, auth0 };
    const store = createStore(reducers, state);
    // 'Replay' all saved actions to recreate last saved store
    user.persistentData.data.forEach((action) => {
      store.dispatch(action);
    });

    res.set('Content-Type', 'text/html')
      .status(200)
      .end(renderPage(match, store));
  });
};

export default (req, res, next) => {
  let match = null;
  // Check if the requested url is one of the React Router routes from routes.js
  routes.forEach((route) => {
    const tmp = matchPath(req.baseUrl, { path: route.path, exact: route.exact, strict: false });
    if (tmp) {
      match = { ...tmp, component: route.component, passdown: route.passdown };
    }
  });

  if (!match) {
    // Not a React Router route, so let express handle it
    next();
  } else {
    // We got a React Router route, so start server side rendering
    const auth0 = {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:8080/callback',
    };

    // Render appropriate page depending on user authentication status
    if (req.user) {
      sendAuthenticatedPage(res, req, match, auth0);
    } else {
      sendGuestPage(res, match, auth0);
    }
  }
};
