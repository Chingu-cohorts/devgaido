import React from 'react';
import PropTypes from 'prop-types';

import Card from '../shared/Card';

const SectionCard = ({ title, subtitle, color, children }) => (
  <div className="section-card">
    <div className="section-card-header" style={{ background: color || 'darkslateblue' }}>
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
  <Card
    caption={path.name}
    subcaption="Path"
    text={path.description}
    linkTo={`/paths/${pathId}`}
    icons={['fa fa-road']}
    color={'#007399'}
    content={<h1 className="completion-text">{path.nCompleted}/{path.nTotal}</h1>}
    nCompleted={0}
    nTotal={8}
  />
);

const PathList = ({ pathIds, curriculum }) => (
  <div className="dashboard-path-list">
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
