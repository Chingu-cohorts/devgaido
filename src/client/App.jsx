import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import PropTypes from 'prop-types';

import { CSSTransitionGroup } from 'react-transition-group';

import ScrollToTop from './pages/shared/ScrollToTop';
import Header from './pages/shared/Header';
import SideDrawer from './pages/shared/SideDrawer';
import Footer from './pages/shared/Footer';

import routesArr from './routes';

const App = ({ serverRoute, location, history }) => {
// If <App /> is rendered on the server we need to provide the serverRoute prop
// since StaticRouter can only render a single Route (Switch only works on client side).
// On the client though, just return all routes and let Switch do the work.

  const routes = [];
  if (serverRoute) {
    routes.push(
      <Route {...serverRoute} key={0} location={location} />,
    );
  } else {
    let key = 0;
    routesArr.forEach((route) => {
      routes.push(
        <Route {...route} key={key += 1} location={location} />);
    });
  }
  return (
    <ScrollToTop>
      <div className="App">
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          titleTemplate="devGaido | %s"
          titleAttributes={{ itemprop: 'name', lang: 'en' }}
          meta={[
            { name: 'description', content: 'devGaido provides easy to follow learning paths that help you become a web developer without the hassle.' },
          ]}
        />
        <Header />
        <SideDrawer history={history} />
        <div className="page-content relative overflow-hidden"> {/* For sticky footer and background color */}
          <CSSTransitionGroup
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionName="page-transition"
          >
            <Switch key={location.pathname} location={location}>
              {routes}
            </Switch>
          </CSSTransitionGroup>
        </div>
        <Footer />
      </div>
    </ScrollToTop>);
};

App.propTypes = {
  serverRoute: PropTypes.objectOf(PropTypes.shape),
  location: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

App.defaultProps = {
  serverRoute: null,
};

export default withRouter(App);
