import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import CourseCatalog from './pages/CourseCatalog/CourseCatalog';
import Login from './pages/Login/Login';
import RequestResetPassword from './pages/Login/RequestResetPassword';
import SetNewPassword from './pages/Login/SetNewPassword';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/requestresetpassword',
    exact: true,
    component: RequestResetPassword,
  },
  {
    path: '/setnewpassword',
    exact: true,
    component: SetNewPassword,
  },
  {
    path: '/register',
    exact: true,
    component: Register,
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
];

export default routes;
