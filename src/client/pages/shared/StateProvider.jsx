/* eslint-disable no-underscore-dangle */
import React from 'react';

/**
 * Instantiate an instance of _StateProviderContainer to hold the state for a component.
 * This allows both the state and the lifecycle methods which operate on it to be abstracted
 * away from the component.
 *
 * @param {any} Component The React component whose state is to be managed
 * @param {any} initialState The value the state is to be initialized to
 * @param {any} lifeCycleHooks References to functions in the component which are associated
 * with specific React lifecycle events. These are invoked at the appropriate points in the
 * React lifecycle.
 * @returns {Class} An instance of the _StateProviderContainer class that encapsulates the
 * state for the component.
 */
const StateProvider = (Component, initialState, lifeCycleHooks) => {

  class _StateProviderContainer extends React.Component {

    /**
     * Creates an instance of _StateProviderContainer.
     *
     * @memberof _StateProviderContainer
     * @returns {null} N/a
     */
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

    /**
     * Change the state that is associated with the Component
     *
     * @param {any} newState New value to be assigned to the state
     * @memberof _StateProviderContainer
     * @returns {null} N/a
     */
    _setState(newState) {
      this._state = newState;
      this.forceUpdate();
    }

    /**
     * Render the component
     *
     * @returns {null} N/a
     * @memberof _StateProviderContainer
     */
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
