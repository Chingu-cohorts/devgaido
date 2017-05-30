/**
 * User state consisting of attributes for the user if logged in.
 *
 * @param {*} state -
 * @param {*} action -
 * @returns {state} state - User data maintained in state
 */
const user = (state = {
  name: '',
  authenticated: false,
  email: '',
  dayLastVisited: -1,
  streak: 0,
  bookmarkedPaths: [],
  lessonsCompleted: [],
}, action) => {
  switch (action.type) {
    case 'TEST_LOGIN':
      return action.user;
    default:
      return state;
  }
};

export default user;
