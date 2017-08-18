import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Metrics = ({ curriculum }) => (
  <div className="metrics abs-bottom-right flex items-end margin-bottom-small margin-right-small">
    <div className="margin-left-tiny">
      <h5 className="c-white no-margin bold">Completed:</h5>
    </div>
    <div className="metrics__paths margin-left-tiny center">
      <h1 className="metrics__paths__count c-white no-margin bold">
        {Object.keys(curriculum.paths).filter(pId => curriculum.paths[pId].completed).length}
      </h1>
      <i className="fa icon-map-signs c-white h2" />
      <h5 className="c-white no-margin">Paths</h5>
    </div>
    <div className="metrics__courses margin-left-tiny center">
      <h1 className="metrics__courses__count c-white no-margin bold">
        {Object.keys(curriculum.courses).filter(cId => curriculum.courses[cId].completed).length}
      </h1>
      <i className="fa icon-flag-checkered c-white h2" />
      <h5 className="c-white no-margin">Milestones</h5>
    </div>
    <div className="metrics__lessons margin-left-tiny center">
      <h1 className="metrics__lessons__count c-white no-margin bold">
        {Object.keys(curriculum.lessons).filter(lId => curriculum.lessons[lId].completed).length}
      </h1>
      <i className="fa icon-graduation-cap c-white h2" />
      <h5 className="c-white no-margin">Lessons</h5>
    </div>
  </div>
);

Metrics.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  curriculum: store.curriculum,
}))(Metrics);
