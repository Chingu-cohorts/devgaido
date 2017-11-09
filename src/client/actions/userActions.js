/* eslint-disable import/prefer-default-export */
import makeActionCreator from './makeActionCreator';

// Create action functions tailored to each specific Redux action. See the
// documentation included in makeActionCreator.js.
export const setLastTouchedPath = makeActionCreator('SET_LAST_TOUCHED_PATH', 'pathId');
export const setLastTouchedLesson = makeActionCreator('SET_LAST_TOUCHED_LESSON', 'lessonId');
export const setCurrentPath = makeActionCreator('SET_LAST_TOUCHED_LESSON', 'pathId');
