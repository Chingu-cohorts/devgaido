/* eslint-disable import/prefer-default-export */
import makeActionCreator from './makeActionCreator';

// Create action functions tailored to each specific Redux action. See the
// documentation included in makeActionCreator.js.
export const addBookmark = makeActionCreator('ADD_BOOKMARK', 'itemId', 'itemType', 'version');
export const removeBookmark = makeActionCreator('REMOVE_BOOKMARK', 'itemId', 'itemType', 'version');
export const completeLesson = makeActionCreator('COMPLETE_LESSON', 'lessonId', 'version');
export const unCompleteLesson = makeActionCreator('UNCOMPLETE_LESSON', 'lessonId', 'version');
