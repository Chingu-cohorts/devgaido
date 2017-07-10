/* eslint-disable import/prefer-default-export */

export function setCurrentPath(pathId) {
  return {
    type: 'SET_CURRENT_PATH',
    pathId,
  };
}

export function setCurrentCourse(pathId) {
  return {
    type: 'SET_CURRENT_COURSE',
    pathId,
  };
}

export function setCurrentLesson(pathId) {
  return {
    type: 'SET_CURRENT_LESSON',
    pathId,
  };
}


