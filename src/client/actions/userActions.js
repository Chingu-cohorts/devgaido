/* eslint-disable import/prefer-default-export */

export function setCurrentPathId(pathId) {
  return {
    type: 'SET_CURRENT_PATH_ID',
    pathId,
  };
}

export function addBookmark(pathId) {
  return {
    type: 'ADD_BOOKMARK',
    pathId,
  };
}

export function removeBookmark(pathId) {
  return {
    type: 'REMOVE_BOOKMARK',
    pathId,
  };
}
