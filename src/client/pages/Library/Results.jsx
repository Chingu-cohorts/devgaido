import React from 'react';
import PropTypes from 'prop-types';

import ImageLinkCard from '../shared/ImageLinkCard';

const filterItem = (item, uiState, filterByTopic, filterBySearchTerm) => {
  let retValTopic = false;
  let retValSearchTerm = false;

  if (filterByTopic) {
    retValTopic = item.subjects.indexOf(uiState.Pages.Library.topic) !== -1;
  }

  if (filterBySearchTerm) {
    retValSearchTerm = item.name
                      .toLowerCase()
                      .includes(uiState.Pages.Library.searchTerm.toLowerCase()) ||
                    item.description
                      .toLowerCase()
                      .includes(uiState.Pages.Library.searchTerm.toLowerCase());
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

const getFilteredItems = (allItems, uiState, filterByTopic, filterBySearchTerm) => {
  const filteredIds = Object.keys(allItems).filter(
    itemId => filterItem(allItems[itemId], uiState, filterByTopic, filterBySearchTerm),
  );

  return filteredIds;
};

const Results = ({ curriculum, uiState }) => {
  const filterByTopic = uiState.Pages.Library.topic !== 'All Topics';
  const filterBySearchTerm = uiState.Pages.Library.searchTerm !== '';

  const filteredPathIds = getFilteredItems(
    curriculum.paths, uiState, filterByTopic, filterBySearchTerm,
  );

  const filteredLessonIds = getFilteredItems(
    curriculum.lessons, uiState, filterByTopic, filterBySearchTerm,
  );

  return (
    <div className="results margin-vertical-big">
      <div className="flex flex-wrap margin-vertical-big justify-space-around">
        {filteredPathIds.map((pathId) => {
          const path = curriculum.paths[pathId];
          return (
            <ImageLinkCard
              item={path}
              linkTo={path.url}
              bgColorClass="bg-primary"
              imgSrc={`/paths/${pathId}.jpg`}
              iconClass="fa-road"
              childIconClass="fa-flag-checkered c-secondary"
              imgBorderClass="border-1px border-primary"
              key={pathId}
              pathId={pathId}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap margin-vertical-big justify-space-around">
        {filteredLessonIds.map((lessonId) => {
          const lesson = curriculum.lessons[lessonId];
          return (
            <ImageLinkCard
              item={lesson}
              linkTo={lesson.url}
              bgColorClass="bg-secondary"
              imgSrc={`/screenshots/${lessonId}.jpg`}
              iconClass="fa-graduation-cap"
              imgBorderClass="border-1px border-secondary"
              key={lessonId}
            />
          );
        })}
      </div>
    </div>
  );
};

Results.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Results;

