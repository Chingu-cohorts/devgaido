/* eslint-disable import/prefer-default-export */

export function addBookmark(itemId, itemCategory) {
  return {
    type: 'ADD_BOOKMARK',
    itemId,
    itemCategory,
  };
}

export function removeBookmark(itemId, itemCategory) {
  return {
    type: 'REMOVE_BOOKMARK',
    itemId,
    itemCategory,
  };
}

export function completeLesson(lessonId) {
  return {
    type: 'COMPLETE_LESSON',
    lessonId,
  };
}

export function unCompleteLesson(lessonId) {
  return {
    type: 'UNCOMPLETE_LESSON',
    lessonId,
  };
}
