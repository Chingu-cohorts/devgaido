import db from './db';

const authenticatedOnly = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  return res.status(401).send('Authentication required');
};

const dbRoutes = (app) => {
  app.post('/users', authenticatedOnly, (req, res) => {
    db.update(req.body, (doc) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Saved:', doc);
      }
      res.send(doc.data);
    });
  });
};

export default dbRoutes;
