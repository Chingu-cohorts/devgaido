/**
 * Auth0 data for lock widget
 *
 * @param {*} state -
 * @param {*} action -
 * @returns {state} state - Auth0 data
 */
const auth0 = (state = {
  domain: '',
  clientID: '',
  callbackURL: '',
}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default auth0;
