import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Card from '../shared/Card';

const SectionCard = ({ title, subtitle, color, children }) => (
  <div className="section-card">
    <div className="section-card-header">
      <span className="section-card-caption">{subtitle}</span>
      <h1 className="section-card-title">{title}</h1>
      <button className="section-card-button">VIEW ALL</button>
    </div>
    <div className="section-card-content">
      {children}
    </div>
  </div>
);

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
  <div className="container">
    <label className="search">
      <input type="text" name="search" placeholder="Search" />
    </label>
    <SectionCard title="All" subtitle="PATHS">
      <PathList
        pathIds={Object.keys(curriculum.paths)}
        curriculum={curriculum}
      />
    </SectionCard>
  </div>
);

SectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.objectOf(PropTypes.shape),
};

SectionCard.defaultProps = {
  color: null,
  children: null,
};

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
