/* eslint-disable no-underscore-dangle */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Helmet } from 'react-helmet';

import dotenv from 'dotenv';

import db from './db';
import reducers from '../client/reducers';
import getContributors from './services/contributors';
import getCurriculum from './services/coreCurriculum';
import App from '../client/App';
import routes from '../client/routes';

const fs = require('fs');

let webpackAssets = null;

if (process.env.NODE_ENV === 'production') {
  webpackAssets = JSON.parse(fs.readFileSync('webpack-assets.json', 'utf8'));
}

const webRoot = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8081' : '';
const cssFile = (process.env.NODE_ENV !== 'production') ? '' : `<link rel="stylesheet" href="${webRoot}/${webpackAssets.main.css}">`;
const runtimeJs = (process.env.NODE_ENV !== 'production') ? `${webRoot}/runtime.js` : `${webRoot}/${webpackAssets.runtime.js}`;
const vendorJs = (process.env.NODE_ENV !== 'production') ? `${webRoot}/vendor.js` : `${webRoot}/${webpackAssets.vendor.js}`;
const mainJs = (process.env.NODE_ENV !== 'production') ? `${webRoot}/main.js` : `${webRoot}/${webpackAssets.main.js}`;

const renderPage = (matchedRoute, store) => {
  const reactMarkup = renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={matchedRoute.url}>
        <App serverRoute={matchedRoute} />
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
      <link href="https://fonts.googleapis.com/css?family=Fira+Sans:400" rel="stylesheet">
      ${cssFile}
    </head>
    <body>
      <div id="root">${reactMarkup}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')};</script>
      <script src="${runtimeJs}"></script>
      <script src="${vendorJs}"></script>
      <script src="${mainJs}"></script>
    </body>
  </html>
  `;
};

const defaults = {
  contributors: null,
  curriculum: null,
  state: null,
  store: null,
  backendData: null,
};

const initDefaults = new Promise((resolve, reject) => {
  dotenv.load();
  const curriculum = getCurriculum();

  const auth0 = {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:8080/callback',
  };

  const backendData = {
    auth0,
    isProduction: (process.env.NODE_ENV === 'production'),
    gaId: process.env.GA_ID,
  };

  getContributors
    .then((contributors) => {
      defaults.curriculum = curriculum;
      defaults.contributors = contributors;
      defaults.backendData = backendData;
      defaults.state = { curriculum, backendData, contributors };
      defaults.store = createStore(reducers, defaults.state);
      resolve(defaults);
    })
    .catch((error) => {
      console.log(`Error initializing default values for Redux store. ${error}`);
      reject(error);
    });
});

const sendGuestPage = (res, matchedRoute) => {
  res.set('Content-Type', 'text/html')
      .status(200)
      .end(renderPage(matchedRoute, defaults.store));
};

const sendAuthenticatedPage = (res, req, matchedRoute) => {
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
    const state = { user, curriculum, backendData: defaults.backendData, contributors: defaults.contributors };
    const store = createStore(reducers, state);
    // 'Replay' all saved actions to recreate last saved store
    user.persistentData.data.forEach((action) => {
      store.dispatch(action);
    });
    res.set('Content-Type', 'text/html')
      .status(200)
      .end(renderPage(matchedRoute, store));
  });
};

const handleReactRoutes = (req, res, next) => {
  let matchedRoute = null;

  // Check if the requested url is one of the React Router routes from routes.js
  for (let i = 0; i < routes.length; i += 1) {
    const pathMatch = matchPath(req.baseUrl, {
      path: routes[i].path,
      exact: routes[i].exact,
      strict: false,
    });

    if (pathMatch) {
      matchedRoute = {
        ...routes[i],
        url: pathMatch.url,
      };
      break;
    }
  }
  if (!matchedRoute) {
    // Not a React Router route, so let express handle it
    next();
  } else {
    // We got a React Router route, so start server side rendering

    // Render appropriate page depending on user authentication status

    if (req.user) {
      sendAuthenticatedPage(res, req, matchedRoute);
    } else {
      sendGuestPage(res, matchedRoute);
    }
  }
};

const initReactRoutes = new Promise((resolve, reject) => {
  initDefaults
  .then(() => {
    console.log('React routes successfully initialized.');
    resolve(handleReactRoutes);
  })
  .catch((error) => {
    console.log('Error initializing React routes.');
    reject(error);
  });
});

export default initReactRoutes;
