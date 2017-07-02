import React from 'react';
import PropTypes from 'prop-types';

import { setCatalogTopic, setCatalogSearchTerm } from './PathCatalogActions';
import LinkCard from '../shared/LinkCard';

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
        <LinkCard key={pathId} item={path} path={`/paths/${pathId}`} color="primary" />
      );
    })}
  </div>
);

const PathCatalog = ({ curriculum, uiState, dispatch }) => (
  <div>
    <div className="page-hero">
      <div className="page-hero-img page-hero-img-desaturate page-hero-img-library" />
      <div className="page-hero-color-overlay page-hero-color-overlay-path-catalog" />
      <div className="page-hero-container">
        <h1 className="page-hero-name">BROWSE PATHS</h1>
      </div>
    </div>
    <div className="search-bar">
      <div className="container">
        <div className="search-bar-content">
          <div className="path-search-container">
            <i className="path-search-icon fa fa-search" />
            <input id="path-search" type="text" name="pathSearch" placeholder="Search" onChange={e => onSearchChange(e, dispatch)} />
          </div>
          <div className="path-topics-dropdown">
            <select id="path-topics" onChange={e => onTopicChange(e, dispatch)} >
              <option value="All Topics" key="AllTopics">All Topics</option>
              {Object.keys(curriculum.subjects).map(
                subjectId => <option value={subjectId} key={subjectId}>{subjectId}</option>,
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
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
        curriculum={curriculum} // ST : T   R
                                // -    -   T
                                // V    -   V
                                // -    V   V
                                // V    V   V&V
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
