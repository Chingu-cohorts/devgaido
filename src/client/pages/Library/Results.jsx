import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LibraryCard } from '../shared/Cards';

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

const Results = ({ curriculum, uiState, category }) => {
  const filteredIds = category === 'paths' ? getFilteredItems(curriculum.paths, uiState) : getFilteredItems(curriculum.lessons, uiState);

  const results = category === 'paths' ?
  filteredIds.map((pathId) => {
    const path = curriculum.paths[pathId];
    return (
      <LibraryCard item={path} key={pathId} />
    );
  }) :
  filteredIds.map((lessonId) => {
    const lesson = curriculum.lessons[lessonId];
    return (
      <LibraryCard item={lesson} key={lessonId} />
    );
  });

  return (
    <div className="results margin-vertical-big">
      <div className="flex flex-wrap margin-vertical-big justify-around">
        {results}
      </div>
    </div>
  );
};

Results.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  category: PropTypes.string.isRequired,
};

export default connect(store => ({
  uiState: store.uiState,
  curriculum: store.curriculum,
}))(Results);

