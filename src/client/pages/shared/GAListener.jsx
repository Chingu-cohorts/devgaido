import React from 'react';
import ReactGA from 'react-ga';

import { withRouter } from 'react-router';

// Based on code from: https://github.com/react-ga/react-ga/issues/122
class GAListener extends React.Component {
  componentDidMount() {
    ReactGA.initialize('UA-103320988-1');
    this.sendPageView(this.props.history.location);
    this.props.history.listen(this.sendPageView);
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(GAListener);
