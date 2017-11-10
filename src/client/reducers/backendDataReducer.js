
/**
 * @description Redux reducer for Auth0 authentication data
 * @param {Object} [state={
 *   auth0: {
 *     domain: '',
 *     clientID: '',
 *     callbackURL: '',
 *   },
 *   isProduction: false,
 *   gaId: '',
 * }] Authentication data
 * @param {Object} action Action name
 * @returns {Object} state Updated state
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
