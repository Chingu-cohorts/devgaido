import express from 'express';
import handleReactRoutes from './reactRoutes';

const app = express();

app.use('*', handleReactRoutes);

export default app;
