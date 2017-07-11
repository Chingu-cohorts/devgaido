/* eslint-disable import/prefer-default-export */

export function setCurrentPath(pathId) {
  return {
    type: 'SET_CURRENT_PATH',
    pathId,
  };
}
