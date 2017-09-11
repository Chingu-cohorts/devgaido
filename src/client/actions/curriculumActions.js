/* eslint-disable import/prefer-default-export */
import makeActionCreator from './makeActionCreator';

export const addBookmark = makeActionCreator('ADD_BOOKMARK', 'itemId', 'itemCategory','version');
export const removeBookmark = makeActionCreator('REMOVE_BOOKMARK', 'itemId', 'itemCategory','version');
export const completeLesson = makeActionCreator('COMPLETE_LESSON', 'lessonId', 'version');
export const unCompleteLesson = makeActionCreator('UNCOMPLETE_LESSON', 'lessonId', 'version');
