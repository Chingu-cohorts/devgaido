import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PathList from './PathList';

const getCompletedPaths = paths => (
  Object.keys(paths).filter(pathId => paths[pathId].completed)
);

const CompletedTab = ({ curriculum }) => {
  const completedPaths = getCompletedPaths(curriculum.paths);

  return (
    <div className="completed-tab margin-bottom-huge">
      <span>PATHS</span>
      <h2>Completed</h2>
      {
        completedPaths.length !== 0 ?
          <PathList pathIds={completedPaths} curriculum={curriculum} /> :
          <div className="center margin-top-huge">
            <h3>You haven&apos;t completed any paths yet.</h3>
            <Link className="button button--primary" to="/paths">BROWSE PATHS</Link>
          </div>
      }
    </div>
  );
};

CompletedTab.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default CompletedTab;
