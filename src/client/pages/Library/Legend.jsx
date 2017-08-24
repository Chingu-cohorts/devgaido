import React from 'react';

const Legend = () => (
  <div className="legend abs-bottom-right flex items-end margin-bottom-small margin-right-small">
    <div className="legend__paths margin-left-tiny center">
      <i className="fa icon-map-signs c-white h2" />
      <h5 className="c-white no-margin">Path</h5>
    </div>
    <div className="legend__lessons margin-left-tiny center">
      <i className="fa icon-graduation-cap c-white h2" />
      <h5 className="c-white no-margin">Lesson</h5>
    </div>
  </div>
);

export default Legend;
