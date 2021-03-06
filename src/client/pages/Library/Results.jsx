import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ResourceCard } from '../shared/Cards';
import AnimateVisibleChildrenDiv from '../shared/AnimateVisibleChildrenDiv';

const filterByTermNTopic = (item, uiState) => {
  const filterByTopic = uiState.libTopic !== 'All Tags';
  const filterBySearchTerm = uiState.libSearchTerm !== '';

  let retValTopic = false;
  let retValSearchTerm = false;

  if (filterByTopic) {
    retValTopic = item.subjects.indexOf(uiState.libTopic) !== -1;
  }

  if (filterBySearchTerm) {
    retValSearchTerm = item.name
                      .toLowerCase()
                      .includes(uiState.libSearchTerm.toLowerCase()) ||
                    item.description
                      .toLowerCase()
                      .includes(uiState.libSearchTerm.toLowerCase());
  }

  if (filterByTopic || filterBySearchTerm) {
    if (filterByTopic && filterBySearchTerm) {
      return retValTopic && retValSearchTerm;
    }
    if (filterByTopic) {
      return retValTopic;
    }
    return retValSearchTerm;
  }
  return true;
};

const filterByCompletion = (item, uiState) => {
  const showCompleted = uiState.libShowCompleted;
  const showIncomplete = uiState.libShowIncomplete;

  if (item.completed) {
    return showCompleted;
  }

  return showIncomplete;
};

const getFilteredItems = (allItems, uiState) => {
  let filteredIds = Object.keys(allItems).filter(
    itemId => filterByTermNTopic(allItems[itemId], uiState),
  );
  filteredIds = filteredIds.filter(
    itemId => filterByCompletion(allItems[itemId], uiState),
  );
  return filteredIds;
};

const Results = ({ curriculum, uiState, user, category }) => {
  const filteredIds = category === 'paths' ? getFilteredItems(curriculum.paths, uiState) : getFilteredItems(curriculum.lessons, uiState);

  const results = category === 'paths' ?
  filteredIds.map((pathId) => {
    const path = curriculum.paths[pathId];
    return (
      <ResourceCard item={path} user={user} key={pathId} />
    );
  }) :
  filteredIds.map((lessonId) => {
    const lesson = curriculum.lessons[lessonId];
    return (
      <ResourceCard item={lesson} user={user} key={lessonId} />
    );
  });

  return (
    <div className="results margin-vertical-big">
      <AnimateVisibleChildrenDiv dontTriggerOnUpdate className="flex flex-wrap margin-vertical-big justify-around">
        {results}
      </AnimateVisibleChildrenDiv>
    </div>
  );
};

Results.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  category: PropTypes.string.isRequired,
};

export default connect(store => ({
  uiState: store.uiState,
  user: store.user,
  curriculum: store.curriculum,
}))(Results);

