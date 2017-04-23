import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';

const getRoutes = () => {
  return (
    <Route path="/" component={Layout} >
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Route>);
};

export default getRoutes;
