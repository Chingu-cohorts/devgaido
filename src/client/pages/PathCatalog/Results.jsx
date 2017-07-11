import React from 'react';
import PropTypes from 'prop-types';

import ImageLinkCard from '../shared/ImageLinkCard';

const filterItem = (item, uiState, filterByTopic, filterBySearchTerm) => {
  let retValTopic = false;
  let retValSearchTerm = false;

  if (filterByTopic) {
    retValTopic = item.subjects.indexOf(uiState.Pages.PathCatalog.topic) !== -1;
  }

  if (filterBySearchTerm) {
    retValSearchTerm = item.name
                      .toLowerCase()
                      .includes(uiState.Pages.PathCatalog.searchTerm.toLowerCase()) ||
                    item.description
                      .toLowerCase()
                      .includes(uiState.Pages.PathCatalog.searchTerm.toLowerCase());
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
  const filterByTopic = uiState.Pages.PathCatalog.topic !== 'All Topics';
  const filterBySearchTerm = uiState.Pages.PathCatalog.searchTerm !== '';

  const pathIds = getFilteredItems(curriculum.paths, uiState, filterByTopic, filterBySearchTerm);
  const courseIds = getFilteredItems(curriculum.courses, uiState, filterByTopic, filterBySearchTerm);
  const lessonIds = getFilteredItems(curriculum.lessons, uiState, filterByTopic, filterBySearchTerm);

  return (
    <div className="results margin-vertical-big">
      <div className="flex flex flex-wrap margin-vertical-big">
        {pathIds.map((pathId) => {
          const path = curriculum.paths[pathId];
          return (
            <ImageLinkCard item={path} linkTo={path.url} bgColorClass="bg-primary" imgSrc={`/paths/${pathId}.jpg`} iconClass="fa-road" key={pathId} />
          );
        })}
      </div>
      <div className="flex flex flex-wrap margin-vertical-big">
        {courseIds.map((courseId) => {
          const course = curriculum.courses[courseId];
          const parentPath = curriculum.paths[course.parentPathIds[0]];
          const sliceNumber = parentPath.courseIds.indexOf(courseId);
          return (
            <ImageLinkCard item={course} linkTo={course.url} bgColorClass="bg-secondary" sliceNumber={sliceNumber} imgSrc={`/paths/${course.parentPathIds[0]}.jpg`} iconClass="fa-tasks" key={courseId} />
          );
        })}
      </div>
      <div className="flex flex flex-wrap margin-vertical-big">
        {lessonIds.map((lessonId) => {
          const lesson = curriculum.lessons[lessonId];
          return (
            <ImageLinkCard item={lesson} linkTo={lesson.url} bgColorClass="bg-primary" imgSrc={`/screenshots/${lessonId}.jpeg`} iconClass="fa-graduation-cap" key={lessonId} />
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

