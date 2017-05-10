import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import handleReactRoutes from './reactRoutes';
import githubAuth from './githubAuth';


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

githubAuth(app);

app.use(express.static(path.join(__dirname, '../../dist/public')));

app.use('*', handleReactRoutes);


export default app;
