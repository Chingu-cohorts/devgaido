import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ItemList from './ItemList';
import AnimateVisibleChildrenDiv from '../shared/AnimateVisibleChildrenDiv';

const getBookmarkedItems = (allItems) => {
  const items = Object.keys(allItems).filter(itemId => allItems[itemId].bookmarked).map(
    itemId => (allItems[itemId]),
  );
  return items;
};

const BookmarkedTab = ({ curriculum }) => {
  const bookmarkedPaths = getBookmarkedItems(curriculum.paths);
  const bookmarkedCourses = getBookmarkedItems(curriculum.courses);
  const bookmarkedLessons = getBookmarkedItems(curriculum.lessons);

  return (
    <AnimateVisibleChildrenDiv className="bookmarked-tab margin-bottom-huge">
      <div>
        <span>RESOURCES</span>
        <h2>Bookmarked</h2>
      </div>
      { bookmarkedPaths.length !== 0 ?
        <ItemList items={bookmarkedPaths} curriculum={curriculum} category="paths" /> : null }
      {
        bookmarkedCourses.length !== 0 ?
          <ItemList items={bookmarkedCourses} curriculum={curriculum} category="courses" /> : null }
      {
        bookmarkedLessons.length !== 0 ?
          <ItemList items={bookmarkedLessons} curriculum={curriculum} category="lessons" /> : null }
      { bookmarkedLessons.length + bookmarkedCourses.length + bookmarkedPaths.length <= 0 ?
        <div className="center margin-top-huge">
          <h3>You haven&apos;t bookmarked anything yet.</h3>
          <Link className="button button--primary uppercase" to="/library">
            <div className="flex items-center">
              <i className="fa icon-search margin-right-tiny" />
              Browse Library
            </div>
          </Link>
        </div> : null }
    </AnimateVisibleChildrenDiv>
  );
};

BookmarkedTab.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  curriculum: store.curriculum,
}))(BookmarkedTab);
