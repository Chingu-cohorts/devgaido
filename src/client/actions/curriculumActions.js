/* eslint-disable import/prefer-default-export */

export function addBookmark(itemId, itemCategory, version) {
  return {
    type: 'ADD_BOOKMARK',
    itemId,
    itemCategory,
    version,
  };
}

export function removeBookmark(itemId, itemCategory, version) {
  return {
    type: 'REMOVE_BOOKMARK',
    itemId,
    itemCategory,
    version,
  };
}

export function completeLesson(lessonId, version) {
  return {
    type: 'COMPLETE_LESSON',
    lessonId,
    version,
  };
}

export function unCompleteLesson(lessonId, version) {
  return {
    type: 'UNCOMPLETE_LESSON',
    lessonId,
    version,
  };
}

export function submitReview(lessonId, version, rating) {
  return {
    type: 'REVIEW_LESSON',
    lessonId,
    version,
    rating,
  };
}
