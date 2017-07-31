import React from 'react';
import PropTypes from 'prop-types';

const Metrics = ({ curriculum }) => (
  <div className="metrics abs-bottom-right flex align-items-end">
    <div className="margin-left-tiny">
      <h6 className="c-white no-margin">Completed:</h6>
    </div>
    <div className="metrics__paths margin-left-tiny center">
      <h1 className="metrics__paths__count c-white no-margin bold">
        {Object.keys(curriculum.paths).filter(pId => curriculum.paths[pId].completed).length}
      </h1>
      <i className="fa icon-map-signs c-white h1" />
      <h6 className="c-white no-margin bold">Paths</h6>
    </div>
    <div className="metrics__courses margin-left-tiny center">
      <h1 className="metrics__courses__count c-white no-margin bold">
        {Object.keys(curriculum.courses).filter(cId => curriculum.courses[cId].completed).length}
      </h1>
      <i className="fa icon-flag-checkered c-white h1" />
      <h6 className="c-white no-margin bold">Milestones</h6>
    </div>
    <div className="metrics__lessons margin-left-tiny center">
      <h1 className="metrics__lessons__count c-white no-margin bold">
        {Object.keys(curriculum.lessons).filter(lId => curriculum.lessons[lId].completed).length}
      </h1>
      <i className="fa icon-graduation-cap c-white h1" />
      <h6 className="c-white no-margin bold">Lessons</h6>
    </div>
  </div>
);

Metrics.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Metrics;
