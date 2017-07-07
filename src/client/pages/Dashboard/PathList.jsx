import React from 'react';
import PropTypes from 'prop-types';

import { LinkCard } from '../shared/Cards';

const PathList = ({ pathIds, curriculum }) => (
  <div className="path-list flex flex-wrap">
    {pathIds.map((pathId) => {
      const path = curriculum.paths[pathId];
      return (
        <LinkCard item={path} linkTo={`/paths/${pathId}`} bgColorClass="bg-primary" iconClass="fa-road" heightClass="height-100" key={pathId} />
      );
    })}
  </div>
);

PathList.propTypes = {
  pathIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default PathList;
