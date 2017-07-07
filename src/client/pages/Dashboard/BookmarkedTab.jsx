import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ItemList from './ItemList';

const getBookmarkedItem = (allItems, bookmarksArr) => {
  const items = bookmarksArr.map(
    (bookmark) => {
      const link = bookmark;
      const itemId = (bookmark.substr(bookmark.lastIndexOf('/') + 1));

      return {
        ...allItems[itemId],
        linkTo: link,
      };
    },
  );
  return items;
};

const BookmarkedTab = ({ user, curriculum }) => {
  const bookmarkedPaths = getBookmarkedItem(curriculum.paths, user.bookmarkedItems.paths);
  const bookmarkedCourses = getBookmarkedItem(curriculum.courses, user.bookmarkedItems.courses);
  const bookmarkedLessons = getBookmarkedItem(curriculum.lessons, user.bookmarkedItems.lessons);

  return (
    <div className="bookmarked-tab margin-bottom-huge">
      <span>Resources</span>
      <h2>Bookmarked</h2>
      {
        bookmarkedPaths.length !== 0 ?
          <ItemList items={bookmarkedPaths} curriculum={curriculum} category="paths" /> :
          <div className="center margin-top-huge">
            <h3>You haven&apos;t bookmarked any paths yet.</h3>
            <Link className="button button--primary" to="/paths">BROWSE PATHS</Link>
          </div>
      }
      {
        bookmarkedCourses.length !== 0 ?
          <ItemList items={bookmarkedCourses} curriculum={curriculum} category="courses" /> :
          <div className="center margin-top-huge">
            <h3>You haven&apos;t bookmarked any paths yet.</h3>
            <Link className="button button--primary" to="/paths">BROWSE PATHS</Link>
          </div>
      }
      {
        bookmarkedLessons.length !== 0 ?
          <ItemList items={bookmarkedLessons} curriculum={curriculum} category="lessons" /> :
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
