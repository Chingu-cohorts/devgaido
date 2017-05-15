import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Times from './pages/Times/Times';
import Objectives from './pages/Objectives/Objectives';
import CourseCatalog from './pages/CourseCatalog/CourseCatalog';
import Dashboard from './pages/Dashboard/Dashboard';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
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
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
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
