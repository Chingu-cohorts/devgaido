/* eslint-disable import/prefer-default-export */
import makeActionCreator from './makeActionCreator';

export const setLastTouchedPath = makeActionCreator('SET_LAST_TOUCHED_PATH', 'pathId');
export const setLastTouchedLesson = makeActionCreator('SET_LAST_TOUCHED_LESSON', 'lessonId');
export const setCurrentPath = makeActionCreator('SET_LAST_TOUCHED_LESSON', 'pathId');
