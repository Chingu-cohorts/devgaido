import React, { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath, Switch, Route } from 'react-router';

import App from '../client/App';

import Header from '../client/pages/shared/Header';
import Footer from '../client/pages/shared/Footer';

import routes from '../client/routes';

const webRoot = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8081' : '';

const renderPage = reactHTML => `
  <!DOCTYPE html>
  <html lang="en_US">
    <head>
      <meta charset="utf-8">
      <meta content="IE=Edge" http-equiv="X-UA-Compatible">
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
      <meta name="description" content="React/Redux Front-end for DevGaido">
      <meta name="author" content="Chingu DevGaido Team">
      <title>DevGaido - Chingu Learning Path</title>
    </head>
    <body>
      <div id="root">${reactHTML}</div>
      <script src="${webRoot}/client.bundle.js"></script>      
    </body>
  </html>
  `;

const initialView = (req, match) => {
  const route = createElement(Route, {
    path: match.path, exact: match.exact, component: match.component,
  });
  return renderToString(
    <App router={StaticRouter} routerProps={{ context: {}, location: match.path }} routes={route} />,
  );
};

export default (req, res, next) => {
  let match = null;
  routes.forEach((route) => {
    const tmp = matchPath(req.baseUrl, { path: route.path, exact: route.exact, strict: false });
    if (tmp) {
      match = { ...tmp, component: route.component };
    }
  });

  if (!match) {
    next();
  } else {
    res.set('Content-Type', 'text/html')
    .status(200)
    .end(renderPage(initialView(req, match)));
  }
};
