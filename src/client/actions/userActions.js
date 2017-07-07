/* eslint-disable import/prefer-default-export */

export function setCurrentPath(pathId, courseId, lessonId) {
  return {
    type: 'SET_CURRENT_PATH',
    pathId,
    courseId,
    lessonId,
  };
}

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
