import React from 'react';
// import PropTypes from 'prop-types';

const StateProvider = (Component, initialState) => {
  class _StateProviderContainer extends React.Component {
    constructor() {
      super();
      this._state = initialState;
    }

    _setState(newState) {
      this._state = newState;
      this.forceUpdate();
    }

    render() {
      return <Component {...this.props} state={this._state} setState={newState => this._setState(newState)} />;
    }
  }

  return _StateProviderContainer;
};

export default StateProvider;
