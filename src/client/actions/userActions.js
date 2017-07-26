/* eslint-disable import/prefer-default-export */

export function setLastTouchedPath(pathId) {
  return {
    type: 'SET_LAST_TOUCHED_PATH',
    pathId,
  };
}

export function setLastTouchedLesson(lessonId) {
  return {
    type: 'SET_LAST_TOUCHED_LESSON',
    lessonId,
  };
}

export function setCurrentPath(pathId) {
  return {
    type: 'SET_CURRENT_PATH',
    pathId,
  };
}
