import routes from '../client/routes';

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  return res.redirect('/');
};

const restrictRoutes = (app) => {
  routes.forEach((route) => {
    if (route.reqAuth) {
      app.get(route.path, ensureAuthenticated, (req, res, next) => {
        next();
      });
    }
  });
};

export default restrictRoutes;
