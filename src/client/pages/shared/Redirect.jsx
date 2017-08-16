import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Redirect = (Component, onAuthenticated, path) => {
  class _PageContainer extends React.Component {
    componentWillMount() {
      if (this.props.user.authenticated === onAuthenticated) {
        this.dontRender = true;
        this.props.history.push(path, { redirectFromHome: true });
      }
    }
    render() {
      return this.dontRender ? null : <Component {...this.props} />;
    }
  }
  _PageContainer.propTypes = {
    user: PropTypes.objectOf(PropTypes.shape).isRequired,
    history: PropTypes.objectOf(PropTypes.shape).isRequired,
  };
  return withRouter(connect(store => ({
    user: store.user,
  }))(_PageContainer));
};

export default Redirect;
