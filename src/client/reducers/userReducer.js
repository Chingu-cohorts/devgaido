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
  bookmarkedItems: {
    paths: [],
    courses: [],
    lessons: [],
  },
  curPathId: '',
  curCourseId: '',
  curLessonId: '',
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PATH': {
      return { ...state, curPathId: action.pathId, curCourseId: action.courseId, curLessonId: action.lessonId };
    }
    case 'ADD_BOOKMARK': {
      const index = state.bookmarkedItems[action.itemCategory].indexOf(action.itemId);
      if (index === -1) {
        const newBookmarkedItems = { ...state.bookmarkedItems };
        newBookmarkedItems[action.itemCategory] = newBookmarkedItems[action.itemCategory].concat(action.itemId);
        return { ...state, bookmarkedItems: newBookmarkedItems };
      }
      return state;
    }
    case 'REMOVE_BOOKMARK': {
      const index = state.bookmarkedItems[action.itemCategory].indexOf(action.itemId);
      if (index !== -1) {
        const newBookmarkedItems = { ...state.bookmarkedItems };
        newBookmarkedItems[action.itemCategory].splice(index, 1);
        return { ...state, bookmarkedItems: newBookmarkedItems };
      }
      return state;
    }
    default:
      return state;
  }
};

export default user;
