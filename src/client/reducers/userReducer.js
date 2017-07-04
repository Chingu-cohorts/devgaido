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
  bookmarkedPaths: [],
  curPathId: 'p1xt',
  curCourseId: 'p1xttier1',
  curLessonId: 'cs50x',
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PATH': {
      return { ...state, curPathId: action.pathId, curCourseId: action.courseId, curLessonId: action.lessonId };
    }
    case 'ADD_BOOKMARK': {
      const index = state.bookmarkedPaths.indexOf(action.pathId);
      if (index === -1) {
        return { ...state, bookmarkedPaths: state.bookmarkedPaths.concat(action.pathId) };
      }
      return state;
    }
    case 'REMOVE_BOOKMARK': {
      const index = state.bookmarkedPaths.indexOf(action.pathId);
      if (index !== -1) {
        const newBookmarkedPaths = state.bookmarkedPaths.slice(0);
        newBookmarkedPaths.splice(index, 1);
        return { ...state, bookmarkedPaths: newBookmarkedPaths };
      }
      return state;
    }
    default:
      return state;
  }
};

export default user;
