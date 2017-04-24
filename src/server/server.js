const express = require('express');

const app = express();

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
app.get('*', (req, res) => {
  const initialView = '<h1>SERVER SIDE BABY</h1>';
  res.set('Content-Type', 'text/html')
  .status(200)
  .end(renderPage(initialView));
});
module.exports = app;
