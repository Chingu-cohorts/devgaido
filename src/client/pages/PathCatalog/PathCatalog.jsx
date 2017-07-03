import React from 'react';
import PropTypes from 'prop-types';

import PageHero from '../shared/PageHero';
import ImageLinkCard from '../shared/ImageLinkCard';
import PageDivider from '../shared/PageDivider';

import { setCatalogTopic, setCatalogSearchTerm } from './PathCatalogActions';

const onSearchChange = (e, dispatch) => {
  dispatch(setCatalogSearchTerm(e.target.value));
};
const onTopicChange = (e, dispatch) => {
  dispatch(setCatalogTopic(e.target.value));
};

const PathList = ({ pathIds, curriculum }) => (
  <div className="path-list">
    {pathIds.map((pathId) => {
      const path = curriculum.paths[pathId];
      return (
        <ImageLinkCard item={path} linkTo={`/paths/${pathId}`} bgColorClass="bg-secondary" bgImageClass="img-test" iconClass="fa-road" key={pathId} />
      );
    })}
  </div>
);

const PathCatalog = ({ curriculum, uiState, dispatch }) => (
  <div>
    <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__library" title="Browse Paths" />
    <PageDivider>
      <div className="search-bar flex flex-1">
        <i className="fa fa-search c-primary h3 margin-right-small" />
        <input className="no-margin margin-right-small h4 thin" type="text" name="pathSearch" placeholder="Search" onChange={e => onSearchChange(e, dispatch)} />
      </div>
      <div className="path-topics__dropdown relative">
        <select className="no-margin h4 thin" onChange={e => onTopicChange(e, dispatch)} >
          <option value="All Topics" key="AllTopics">All Topics</option>
          {Object.keys(curriculum.subjects).map(
            subjectId => <option value={subjectId} key={subjectId}>{subjectId}</option>,
          )}
        </select>
      </div>
    </PageDivider>
    <div className="container">
      <PathList // TODO: Save subjects in path so we don't have traverse all courses and lessons
        pathIds={Object.keys(curriculum.paths).filter((pathId) => {
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
            retValSearchTerm = curriculum.paths[pathId].name.toLowerCase().includes(uiState.Pages.PathCatalog.searchTerm.toLowerCase()) ||
                  curriculum.paths[pathId].description.toLowerCase().includes(uiState.Pages.PathCatalog.searchTerm.toLowerCase());
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
        })}
        curriculum={curriculum}
      />
    </div>
  </div>
);


PathList.propTypes = {
  pathIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

PathCatalog.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
  uiState: PropTypes.objectOf(PropTypes.shape),
};

PathCatalog.defaultProps = {
  curriculum: null,
  dispatch: null,
  uiState: null,
};

export default PathCatalog;
