/* eslint-disable import/prefer-default-export */

export function setCurrentPath(pathId, courseId, lessonId) {
  return {
    type: 'SET_CURRENT_PATH',
    pathId,
    courseId,
    lessonId,
  };
}

