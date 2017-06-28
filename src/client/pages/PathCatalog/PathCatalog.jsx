import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const PathCard = ({ path, pathId }) => (
  <Link className="col-quarter" to={`/paths/${pathId}`} >
    <div className="card-big card-big-catalog">
      <div className="card-big-header card-big-header-path">
        <h5 className="card-big-header-text">{path.name}</h5>
        <i className="card-big-header-icon fa fa-road" />
      </div>
      <div className="card-big-content">
        <p>{path.description}</p>
        <h4 className="completion-text">{path.nCompleted}/{path.nTotal}</h4>
      </div>
    </div>
  </Link>
);

const PathList = ({ pathIds, curriculum }) => (
  <div className="path-list">
    {pathIds.map((pathId) => {
      const path = curriculum.paths[pathId];
      return (
        <PathCard path={path} pathId={pathId} key={pathId} />
      );
    })}
  </div>
);

const PathCatalog = ({ curriculum }) => (
  <div>
    <div className="page-hero page-hero-compass">
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
            <input id="path-search" type="text" name="pathSearch" placeholder="Search" />
          </div>
          <div className="path-topics-dropdown">
            <select id="path-topics">
              <option value="AllTopics" key="AllTopics">All Topics</option>
              {Object.keys(curriculum.subjects).map(
                subjectId => <option value={subjectId} key={subjectId}>{subjectId}</option>,
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <PathList
        pathIds={Object.keys(curriculum.paths)}
        curriculum={curriculum}
      />
    </div>
  </div>
);

PathCard.propTypes = {
  pathId: PropTypes.string.isRequired,
  path: PropTypes.objectOf(PropTypes.shape).isRequired,
};

PathList.propTypes = {
  pathIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

PathCatalog.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape),
  // dispatch: PropTypes.func,
};

PathCatalog.defaultProps = {
  curriculum: null,
  dispatch: null,
};

export default PathCatalog;
