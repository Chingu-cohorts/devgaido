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
  avatar: '',
  email: '',
  dayLastVisited: Date.now(),
  streak: 0,
  curPathId: '',
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PATH': {
      return {
        ...state,
        curPathId: action.pathId,
      };
    }
    default:
      return state;
  }
};

export default user;
