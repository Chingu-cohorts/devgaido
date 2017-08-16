import Home from './pages/Home/Home';
import Path from './pages/Path/Path';
import Lesson from './pages/Lesson/Lesson';
import Library from './pages/Library/Library';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Disclaimer from './pages/Disclaimer/Disclaimer';
import Styleguide from './pages/Styleguide/Styleguide';
import Signup from './pages/Signup/Signup';
/**
 * Client route definitions
 *
 * - path:      Path to the directory containing the component
 * - exact:     If true, only exact routes are matched.
 *              ("/" would match EVERY route without it for example)
 * - component: Component name. For example 'Home' for the 'Home.jsx' component.
 * - reqAuth:   If set, that route can only be accessed
 *              when authenticated, otherwise it redirects to "/".
 */
const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/styleguide',
    exact: true,
    component: Styleguide,
  },
  {
    path: '/signup',
    exact: true,
    component: Signup,
    // passdown: ['auth0'],
  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    path: '/contact',
    exact: true,
    component: Contact,
  },
  {
    path: '/disclaimer',
    exact: true,
    component: Disclaimer,
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    reqAuth: true,
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    reqAuth: true,
  },
  {
    path: '/paths/:id',
    exact: true,
    component: Path,
  },
  {
    path: '/lessons/:id',
    exact: true,
    component: Lesson,
  },
  {
    path: '/library',
    exact: true,
    component: Library,
  },
];

export default routes;
