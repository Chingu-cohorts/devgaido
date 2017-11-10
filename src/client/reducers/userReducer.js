import persistentData from './persistentData';

/**
 * @description User state consisting of attributes for the user if logged in.
 * @param {Object} [state={
 *   name: '',
 *   authenticated: false,
 *   avatar: '',
 *   email: '',
 *   curPathId: '',
 *   lastPathId: '',
 *   lastLessonId: '',
 *   persistentData: {},
 * }] Current User state
 * @param {Object} User state action name 
 * @returns {Object} Updated user state
 */
const user = (state = {
  name: '',
  authenticated: false,
  avatar: '',
  email: '',
  curPathId: '',
  lastPathId: '',
  lastLessonId: '',
  persistentData: {},
}, action) => {
  let retState = state;

  switch (action.type) {
    case 'SET_CURRENT_PATH': {
      retState = {
        ...state,
        curPathId: action.pathId,
      };
      break;
    }
    default:
      break;
  }
  switch (action.type) {
    case 'SET_LAST_TOUCHED_LESSON': {
      retState = {
        ...state,
        lastLessonId: action.lessonId,
      };
      break;
    }
    default:
      break;
  }
  switch (action.type) {
    case 'SET_LAST_TOUCHED_PATH': {
      retState = {
        ...state,
        lastPathId: action.pathId,
      };
      break;
    }
    default:
      break;
  }

  if (retState.authenticated) {
    retState = {
      ...retState,
      persistentData: persistentData(retState.persistentData, action),
    };
  }

  return retState;
};

export default user;
