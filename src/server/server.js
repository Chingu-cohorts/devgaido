import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import handleReactRoutes from './reactRoutes';
import dbRoutes from './dbRoutes';
import auth0Auth from './auth0Auth';
import restrictRoutes from './restrictRoutes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../dist/public')));
auth0Auth(app);
restrictRoutes(app);
dbRoutes(app);
app.use('*', handleReactRoutes);

export default app;
