/* eslint-disable import/prefer-default-export */

export function completeLesson(lessonId, linkTo) {
  return {
    type: 'COMPLETE_LESSON',
    lessonId,
    linkTo,
  };
}

export function unCompleteLesson(lessonId) {
  return {
    type: 'UNCOMPLETE_LESSON',
    lessonId,
  };
}
