/* eslint-disable import/prefer-default-export */

export function addBookmark(itemId, itemCategory, linkTo) {
  return {
    type: 'ADD_BOOKMARK',
    itemId,
    itemCategory,
    linkTo,
  };
}

export function removeBookmark(itemId, itemCategory, linkTo) {
  return {
    type: 'REMOVE_BOOKMARK',
    itemId,
    itemCategory,
    linkTo,
  };
}
