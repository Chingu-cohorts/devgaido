import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ImageLinkCard from '../shared/ImageLinkCard';

const filterByTermNTopic = (item, uiState) => {
  const filterByTopic = uiState.libTopic !== 'All Topics';
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
      <ImageLinkCard
        item={path}
        linkTo={path.url}
        bgColorClass="bg-primary"
        imgSrc={`/paths/${pathId}.jpg`}
        iconClass="icon-map-signs"
        childIconClass="icon-flag-checkered c-primary"
        imgBorderClass="border-1px border-primary"
        key={pathId}
        pathId={pathId}
      />
    );
  }) :
  filteredIds.map((lessonId) => {
    const lesson = curriculum.lessons[lessonId];
    return (
      <ImageLinkCard
        item={lesson}
        linkTo={lesson.url}
        bgColorClass="bg-accent"
        imgSrc={`/screenshots/${lessonId}.jpg`}
        iconClass="icon-graduation-cap"
        imgBorderClass="border-1px border-accent"
        key={lessonId}
      />
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

