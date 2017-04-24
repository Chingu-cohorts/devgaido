import Home from './pages/Home';
import Login from './pages/Login';

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
];

export default routes;
