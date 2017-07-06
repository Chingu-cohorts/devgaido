import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PathList from './PathList';

const getBookmarkedPaths = (paths, bookmarkedPathIds) => (
  Object.keys(paths).filter(pathId => bookmarkedPathIds.indexOf(pathId) !== -1)
);

const BookmarkedTab = ({ user, curriculum }) => {
  const bookmarkedPaths = getBookmarkedPaths(curriculum.paths, user.bookmarkedPaths);

  return (
    <div className="bookmarked-tab">
      <span>PATHS</span>
      <h2>Bookmarked</h2>
      {
        bookmarkedPaths.length !== 0 ?
          <PathList pathIds={bookmarkedPaths} curriculum={curriculum} /> :
          <div className="center margin-top-huge">
            <h3>You haven&apos;t bookmarked any paths yet.</h3>
            <Link className="button button--primary" to="/paths">BROWSE PATHS</Link>
          </div>
      }
    </div>
  );
};

BookmarkedTab.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default BookmarkedTab;
