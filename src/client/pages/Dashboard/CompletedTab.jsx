import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ItemList from './ItemList';
import AnimateVisibleChildrenDiv from '../shared/AnimateVisibleChildrenDiv';

const getCompletedItems = (allItems) => {
  const items = Object.keys(allItems).filter(itemId => allItems[itemId].completed).map(
    itemId => (allItems[itemId]),
  );
  return items;
};

const CompletedTab = ({ curriculum }) => {
  const completedPaths = getCompletedItems(curriculum.paths);
  const completedLessons = getCompletedItems(curriculum.lessons);

  return (
    <AnimateVisibleChildrenDiv className="bookmarked-tab margin-bottom-huge">
      <div className="margin-tiny">
        <span>RESOURCES</span>
        <h2>Completed</h2>
      </div>
      { completedPaths.length !== 0 ?
        <ItemList items={completedPaths} curriculum={curriculum} category="paths" /> : null }
      {
        completedLessons.length !== 0 ?
          <ItemList items={completedLessons} curriculum={curriculum} category="lessons" /> : null }
      { completedLessons.length + completedPaths.length <= 0 ?
        <div className="center margin-top-huge">
          <h3>You haven&apos;t completed anything yet.</h3>
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

CompletedTab.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  curriculum: store.curriculum,
}))(CompletedTab);
