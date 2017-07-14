import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import handleReactRoutes from './reactRoutes';
import auth0Auth from './auth0Auth';
import restrictRoutes from './restrictRoutes';

const app = express();
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../dist/public')));
auth0Auth(app);
restrictRoutes(app);
app.use('*', handleReactRoutes);

export default app;
