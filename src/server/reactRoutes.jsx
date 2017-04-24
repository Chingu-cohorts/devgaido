import React, { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
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

const initialView = (req, match) => renderToString(
  <AppContainer>
    <Provider store={{}}>
      <div>
        <h1>I AM APP!</h1>
        <StaticRouter context={{}} location={match.path}>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
            <Switch>
              {createElement(Route, {
                path: match.path, exact: match.exact, component: match.component,
              })}
            </Switch>
          </div>
        </StaticRouter>
      </div>
    </Provider>
  </AppContainer>,
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
    next();
  } else {
    res.set('Content-Type', 'text/html')
    .status(200)
    .end(renderPage(initialView(req, match)));
  }
};
