import React from 'react';
import ReactGA from 'react-ga';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Based on code from: https://github.com/react-ga/react-ga/issues/122
class GAListener extends React.Component {
  constructor(props) {
    super(props);
    this.gaId = props.backendData.gaId;
  }
  componentDidMount() {
    if (this.props.backendData.isProduction) {
      ReactGA.initialize(this.gaId);
      this.sendPageView(this.props.history.location);
      this.props.history.listen(this.sendPageView);
    } else {
      console.log('Development mode - no Google Analytics will be used.');
    }
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}
export default withRouter(connect(store => ({
  backendData: store.backendData,
}))(GAListener));
