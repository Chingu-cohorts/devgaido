import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';

import App from '../client/App';

import routes from '../client/routes';

const webRoot = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8081' : '';
const loginWidget = `<script>
var lock = new Auth0Lock('L90m0rEGvEWnCkQOBYE3U30J6m68HDIb', 'devgaido.auth0.com', { auth: {
          redirectUrl: 'p1EmwSaGtMd-8o_q7XU4nayvO7aNmuh58nIfij5tXpyU8zq9ACT0WOTVGfEb3Tf8'
        , responseType: 'code'
        , params: {
          scope: 'openid name email picture'
        }
      }
        , theme: {
            logo: 'https://example.com/assets/logo.png',
            primaryColor: 'green'
        }
        , languageDictionary: {
            title: "My Company"
        }});
    lock.show();
</script>`;

const renderPage = (reactHTML, initialStore, datLoginWidget) => `
  <!DOCTYPE html>
  <html lang="en_US">
    <head>
      <meta charset="utf-8">
      <meta content="IE=Edge" http-equiv="X-UA-Compatible">
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
      <meta name="description" content="React/Redux Front-end for DevGaido">
      <meta name="author" content="Chingu DevGaido Team">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <title>DevGaido - Chingu Learning Path</title>
    </head>
    <body>
      <div id="root">${reactHTML}</div>
      <script>window.__INITIAL_STORE__ = ${JSON.stringify(initialStore).replace(/</g, '\\u003c')};</script>
      <script src="${webRoot}/client.bundle.js"></script>
      <script src="https://cdn.auth0.com/js/lock/10.14/lock.min.js"></script>
      ${datLoginWidget}   
    </body>
  </html>
  `;
// We need to provide the serverMatch prop to <App /> since we are on the server side
// and can only render a single route with StaticRouter (Switch is not working like on client side)
const initialView = (req, match) => renderToString(
  <StaticRouter context={{}} location={match.path}>
    <App serverMatch={match} />
  </StaticRouter>,
  );

export default (req, res, next) => {
  let match = null;
  routes.forEach((route) => {
    const tmp = matchPath(req.baseUrl, { path: route.path, exact: route.exact, strict: false });
    if (tmp) {
      match = { ...tmp, component: route.component };
    }
  });

  if (!match) {
    console.log('no match', req.baseUrl)
    /*const user = req.user ? { name: req.user.username, authenticated: true }
                          : { name: '', authenticated: false };
    const store = { user };
    console.log('WE SHOULD SEE LOGIN WIDGET');
    res.set('Content-Type', 'text/html')
    .status(200)
    .end(renderPage(initialView(req, match), store, loginWidget));*/
    next();
  } else {
    console.log('match', match)
    const user = req.user ? { name: req.user.username, authenticated: true }
                          : { name: '', authenticated: false };
    const store = { user };

    res.set('Content-Type', 'text/html')
    .status(200)
    .end(renderPage(initialView(req, match), store, loginWidget));
  }
};
