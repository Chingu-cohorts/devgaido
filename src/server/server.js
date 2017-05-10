import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import handleReactRoutes from './reactRoutes';
import githubAuth from './githubAuth';
import auth0Auth from './auth0';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//githubAuth(app);
auth0Auth(app);

app.use('*', handleReactRoutes);

app.use(express.static(path.join(__dirname, '../../dist/public')));

export default app;
