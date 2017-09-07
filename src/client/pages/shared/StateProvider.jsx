/* eslint-disable no-underscore-dangle */
import React from 'react';

/**
 * StateProvider adds state and lifecycle methods to a stateless component.
 * StateProvider does not return the stateless component wrapped inside a container component
 * but a modified version of the original component, so the number of renders does not increase.
 *
 * @param {any} Component The stateless React component
 * @param {any} initialState The initial state of the component (=this.state)
 * @param {any} lifeCycleHooks References to functions in the component which are associated
 * with specific React lifecycle events. These are invoked at the appropriate points in the
 * React lifecycle.
 * The first parameter passed over to those hooks will always be a reference to "this".
 *
 * @returns {Class} Stateful version of the original component
 * with added props "state", "setState(...)" and "that" (=reference to 'this')
 *
 * Example usage in the export statement:
 *
 * export default StateProvider(MilestoneCard, {       // Component
 *   firstRender: true,                                // initialState
 *   transitionAdded: false,
 *   maxContentHeight: '',
 * }, {
 *   _constructor,                                     // lifeCycleHooks
 *   componentDidMount,
 *   shouldComponentUpdate,
 * });
 */
const StateProvider = (Component, initialState, lifeCycleHooks) => class extends React.Component {
   /**
   * Since the stateful component returned by StateProvider has no name
   * return the original Components name instead. This makes it so that error messages and
   * the React dev tools show the correct Component name.
   */
  static get name() {
    return Component.name;
  }

  constructor() {
    super();
    this.state = initialState;

    Object.keys(lifeCycleHooks).forEach(
      (functionName) => {
        // Bind life cycle hooks and add 'this' as first parameter
        this[functionName] = (...args) => lifeCycleHooks[functionName](this, ...args);
      },
    );

    if (lifeCycleHooks._constructor) {
      lifeCycleHooks._constructor(this);
    }
  }

  render() {
    return Component({
      ...this.props,
      state: this.state,
      setState: (newState, callback) => this.setState(newState, callback),
      that: this,
    });
  }
};

export default StateProvider;
