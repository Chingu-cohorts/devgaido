import React from 'react';
import PropTypes from 'prop-types';

import ImageLinkCard from '../shared/ImageLinkCard';

const getFilteredResults = (curriculum, uiState) => {
  const pathIds = Object.keys(curriculum.paths);
  const filteredPathIds = pathIds.filter(
    (pathId) => {
      let retValTopic = false;
      let retValSearchTerm = false;
      let filterTopic = false;
      let filterSearchTerm = false;
      if (uiState.Pages.PathCatalog.topic !== 'All Topics') {
        filterTopic = true;
        curriculum.paths[pathId].courseIds.forEach((courseId) => {
          if (curriculum.courses[courseId]) {
            curriculum.courses[courseId].lessonIds.forEach((lessonId) => {
              if (curriculum.lessons[lessonId].subject === uiState.Pages.PathCatalog.topic) {
                retValTopic = true;
              }
            });
          }
        });
      }
      if (uiState.Pages.PathCatalog.searchTerm !== '') {
        // TODO: Extend search to courses and lessons?
        filterSearchTerm = true;
        retValSearchTerm = curriculum.paths[pathId].name
                            .toLowerCase()
                            .includes(uiState.Pages.PathCatalog.searchTerm.toLowerCase()) ||
                          curriculum.paths[pathId].description
                            .toLowerCase()
                            .includes(uiState.Pages.PathCatalog.searchTerm.toLowerCase());
      }
      if (filterTopic || filterSearchTerm) {
        if (filterTopic && filterSearchTerm) {
          return retValTopic && retValSearchTerm;
        }
        if (filterTopic) {
          return retValTopic;
        }
        return retValSearchTerm;
      }
      return true;
    });
  return filteredPathIds;
};

const Results = ({ curriculum, uiState }) => {
  const pathIds = getFilteredResults(curriculum, uiState);
  return (
    <div className="results flex flex-wrap margin-vertical-big">
      {pathIds.map((pathId) => {
        const path = curriculum.paths[pathId];
        return (
          <ImageLinkCard item={path} linkTo={`/paths/${pathId}`} bgColorClass="bg-secondary" bgImageClass="img-test" iconClass="fa-road" key={pathId} />
        );
      })}
    </div>
  );
};

Results.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Results;

