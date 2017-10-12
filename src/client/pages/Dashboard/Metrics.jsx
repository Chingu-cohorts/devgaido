import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Metrics = ({ curriculum }) => (
  <div className="metrics abs-bottom-right-above-t abs-bottom-left-below-t width-100-below-t flex items-end justify-center-below-t margin-bottom-small-above-t margin-bottom-tiny-below-t margin-right-small-above-t">
    <div className="margin-left-tiny display-none-below-m">
      <h5 className="c-white no-margin wide uppercase">Completed:</h5>
    </div>
    <div className="metrics__paths margin-left-tiny-above-m center">
      <div className="flex-column flex-below-t">
        <h3 className="metrics__paths__count c-white no-margin bold h4-below-t order-2-below-t">
          {Object.keys(curriculum.paths).filter(pId => curriculum.paths[pId].completed).length}
        </h3>
        <i className="fa icon-map-signs c-white h3 h4-below-t margin-horizontal-tiny-below-t margin-left-0-below-m" />
      </div>
      <h5 className="c-white no-margin display-none-below-t">Paths</h5>
    </div>
    <div className="metrics__courses margin-left-tiny center">
      <div className="flex-column flex-below-t">
        <h3 className="metrics__courses__count c-white no-margin bold h4-below-t order-2-below-t">
          {Object.keys(curriculum.courses).filter(cId => curriculum.courses[cId].completed).length}
        </h3>
        <i className="fa icon-flag-checkered c-white h3 h4-below-t margin-horizontal-tiny-below-t " />
      </div>
      <h5 className="c-white no-margin display-none-below-t">Milestones</h5>
    </div>
    <div className="metrics__lessons margin-left-tiny center">
      <div className="flex-column flex-below-t">
        <h3 className="metrics__lessons__count c-white no-margin bold h4-below-t order-2-below-t">
          {Object.keys(curriculum.lessons).filter(lId => curriculum.lessons[lId].completed).length}
        </h3>
        <i className="fa icon-graduation-cap c-white h3 h4-below-t margin-horizontal-tiny-below-t" />
      </div>
      <h5 className="c-white no-margin display-none-below-t">Lessons</h5>
    </div>
  </div>
);

Metrics.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  curriculum: store.curriculum,
}))(Metrics);
