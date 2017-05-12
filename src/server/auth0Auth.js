import { getLesson, getLessons } from './services/lessons';
import { getSubject, getSubjects } from './services/subjects';

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

dotenv.load();

const strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:8080/callback',
}, (accessToken, refreshToken, extraParams, profile, done) =>
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
   done(null, profile));

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const auth0Auth = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    secret: 'shhhhhhhhh',
    resave: true,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
    (req, res) => {
      res.redirect(req.session.returnTo || '/');
      console.log('user', req.user);
    });

  /*
   * Intercept and route API request for lessons in the Core Learning Path
   */

  // Get the details for a specific lesson in the Core Learning Path
  app.get('/lesson/:lessonId(*)', (req, res) => {
    res.json(getLesson(req.params.lessonId));
  });
  // Get a list of all lessons for specific subject in the Core Learning Path
  app.get('/lessons/:subjectId(*)', (req, res) => {
    res.json(getLessons(req.params.subjectId));
  });

  /*
   * Intercept and route API requests for subjects in  the Core Learning Path
   */

  // Get the details for a specific subject in the Core Learning Path
  app.get('/subject/:subjectId(*)', (req, res) => {
    res.json(getSubject(req.params.subjectId));
  });
  // Get a list of all subjects in the Core Learning Path
  app.get('/subjects', (req, res) => {
    res.json(getSubjects());
  });
};

export default auth0Auth;
