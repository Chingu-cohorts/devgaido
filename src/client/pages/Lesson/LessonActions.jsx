/* eslint-disable import/prefer-default-export */

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
