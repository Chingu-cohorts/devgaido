import Home from './pages/Home/Home';
import Paths from './pages/Paths/Paths';
import Profile from './pages/Profile/Profile';
import Times from './pages/Times/Times';
import Objectives from './pages/Objectives/Objectives';
import CourseCatalog from './pages/CourseCatalog/CourseCatalog';
import Dashboard from './pages/Dashboard/Dashboard';

/**
 * Client route definitions
 * 
 * - path: path to the directory containing the component
 * - exact: 
 * - component: component name. For example 'Home' for the 'Home.jsx' component.
 * - passdown: array of state names defining the state data to be passed to the
 *   component. Items named in passdown are defined in /server/reactRoutes.jsx.
 */
const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/paths',
    exact: true,
    component: Paths,
    passdown: ['dispatch', 'curriculum', 'uiState'],
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/courses',
    exact: true,
    component: CourseCatalog,
    passdown: ['curriculum'],
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    passdown: ['user'],
  },
  {
    path: '/times',
    exact: true,
    component: Times,
  },
  {
    path: '/objectives',
    exact: true,
    component: Objectives,
  },
];

export default routes;
