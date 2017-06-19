/* eslint-disable import/prefer-default-export */

export function completeLesson(lessonId, curriculum) {
  return {
    type: 'COMPLETE_LESSON',
    lessonId,
    curriculum,
  };
}

export function unCompleteLesson(lessonId, curriculum) {
  return {
    type: 'UNCOMPLETE_LESSON',
    lessonId,
    curriculum,
  };
}
