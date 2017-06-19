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
  dayLastVisited: Date.now(),
  streak: 0,
  bookmarkedPaths: ['webpagedc', 'javascript'],
  lessonsCompleted: ['learnhtmlcss', 'onlineresume', 'advancedhtml', 'intermediatecss', 'advancedcss'],
  curPathId: 'srcctrl',
}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default user;
