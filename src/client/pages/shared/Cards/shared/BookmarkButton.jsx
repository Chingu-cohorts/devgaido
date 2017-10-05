import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../shared/Button';

import actions from '../../../../actions';

const {
  addBookmark,
  removeBookmark,
} = actions;

const BookmarkButton = ({ item, type }) => {
  const handleClick = !item.bookmarked ?
    () => addBookmark(item.id, type, item.version) :
    () => removeBookmark(item.id, type, item.version);

  const caption = !item.bookmarked ? 'Bookmark' : 'Remove Bookmark';

  return (
    <Button className="button--default" icon="icon-thumb-tack" onClick={handleClick}>{caption}</Button>
  );
};


BookmarkButton.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  type: PropTypes.string.isRequired,
};

export default BookmarkButton;
