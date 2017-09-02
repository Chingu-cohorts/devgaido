/* eslint-disable no-underscore-dangle */
import React from 'react';

const StateProvider = (Component, initialState, lifeCycleHooks) => {
  class _StateProviderContainer extends React.Component {
    constructor() {
      super();

      this._state = initialState;

      Object.keys(lifeCycleHooks).forEach(
        (functionName) => { this[functionName] = lifeCycleHooks[functionName](this); },
      );

      if (lifeCycleHooks._constructor) {
        lifeCycleHooks._constructor(this)();
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
          forceUpdate={() => this.forceUpdate()}
          that={this}
        />
      );
    }
  }

  return _StateProviderContainer;
};

export default StateProvider;
