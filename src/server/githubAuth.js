// TODO: Change it to use cookies instead of sessions
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const clientID = process.env.GITHUB_CLIENT_ID || '';
const clientSecret = process.env.GITHUB_CLIENT_SECRET || '';
const callbackURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8080/auth/github/callback' : process.env.GITHUB_CALLBACK_URL;

const githubAuth = (app) => {
  app.use(session({
    store: new FileStore(),
    secret: '11THIS IS A SECRET STRING AND STUFF FOR HASHING THE SESSION11',
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GitHubStrategy({ clientID, clientSecret, callbackURL },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    },
  ));
  passport.serializeUser((user, done) => (done(null, user)));
  passport.deserializeUser((obj, done) => (done(null, obj)));

  app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    console.log('Logged In.');
    res.redirect('/');
  });
  app.get('/logout', (req, res) => {
    req.logout();
    console.log('Logged out.');
    res.redirect('/');
  });
};

export default githubAuth;
