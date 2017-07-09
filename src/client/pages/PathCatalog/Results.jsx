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

