import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import initReactRoutes from './reactRoutes';
import dbRoutes from './dbRoutes';
import auth0Auth from './auth0Auth';
import restrictRoutes from './restrictRoutes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../dist/public'), { maxage: '31536000000' }));
auth0Auth(app);
restrictRoutes(app);
dbRoutes(app);
app.use('*', (req, res, next) => {
  initReactRoutes
    .then((handleReactRoutes) => {
      handleReactRoutes(req, res, next);
    })
    .catch((error) => {
      throw error;
    });
});

app.get('*', (req, res) => {
  res.status(404).end();
});

export default app;
