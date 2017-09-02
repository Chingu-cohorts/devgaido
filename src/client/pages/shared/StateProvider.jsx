/* eslint-disable no-underscore-dangle */
import React from 'react';

const StateProvider = (Component, initialState, lifeCycleHooks) => {
  class _StateProviderContainer extends React.Component {
    constructor() {
      super();

      this._state = initialState;

      Object.keys(lifeCycleHooks).forEach(
        (functionName) => { this[functionName] = lifeCycleHooks[functionName]; },
      );

      if (lifeCycleHooks._constructor) {
        lifeCycleHooks._constructor();
      }
    }

    _setState(newState) {
      this._state = newState;
      this.forceUpdate();
    }

    render() {
      return (
        <Component
          {...this.props}
          state={this._state}
          setState={newState => this._setState(newState)}
        />
      );
    }
  }

  return _StateProviderContainer;
};

export default StateProvider;
