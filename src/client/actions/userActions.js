/* eslint-disable import/prefer-default-export */

export function setCurrentPath(pathId, version) {
  return {
    type: 'SET_CURRENT_PATH',
    pathId,
    version,
  };
}
