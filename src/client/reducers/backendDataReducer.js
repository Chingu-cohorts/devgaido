/**
 * Auth0 data for lock widget
 *
 * @param {*} state -
 * @param {*} action -
 * @returns {state} state - Auth0 data
 */
const backendData = (state = {
  auth0: {
    domain: '',
    clientID: '',
    callbackURL: '',
  },
  isProduction: false,
  gaId: '',
}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default backendData;
