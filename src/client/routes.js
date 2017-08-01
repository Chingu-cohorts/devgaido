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
/**
 * Client route definitions
 *
 * - path:      Path to the directory containing the component
 * - exact:     If true, only exact routes are matched.
 *              ("/" would match EVERY route without it for example)
 * - component: Component name. For example 'Home' for the 'Home.jsx' component.
 * - passdown:  Array of property names to be passed to the component.
 *              (Those names are defined in /server/reactRoutes.jsx)
 * - reqAuth:   If set, that route can only be accessed
 *              when authenticated, otherwise it redirects to "/".
 */
const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    passdown: ['lock', 'user'],
  },
  {
    path: '/styleguide',
    exact: true,
    component: Styleguide,
  },
  {
    path: '/about',
    exact: true,
    component: About,
    passdown: ['lock', 'contributors'],
  },
  {
    path: '/contact',
    exact: true,
    component: Contact,
    passdown: ['lock'],
  },
  {
    path: '/disclaimer',
    exact: true,
    component: Disclaimer,
    passdown: ['lock'],
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    passdown: ['user', 'curriculum', 'uiState'],
    reqAuth: true,
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    passdown: ['user'],
    reqAuth: true,
  },
  {
    path: '/paths/:id',
    exact: true,
    component: Path,
    passdown: ['curriculum', 'user'],
  },
  {
    path: '/lessons/:id',
    exact: true,
    component: Lesson,
    passdown: ['curriculum', 'user'],
  },
  {
    path: '/library',
    exact: true,
    component: Library,
    passdown: ['curriculum', 'uiState'],
  },
];

export default routes;
