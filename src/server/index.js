import http from 'http';
import app from './server';

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

let currentApp = app;

server.listen(PORT, () => {
  console.log(`Express server running at ${PORT} in ${process.env.NODE_ENV || 'dev'} mode`);
});

// Handle hot module replacement
if ((process.env.NODE_ENV !== 'production') && module.hot) {
  module.hot.accept('./server', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
