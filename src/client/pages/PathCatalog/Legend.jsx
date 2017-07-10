import React from 'react';

const Legend = () => (
  <div className="legend abs-bottom-right flex align-items-end">
    <div className="legend__paths margin-left-tiny center">
      <i className="fa fa-road c-white h1" />
      <h6 className="c-white no-margin bold">Path</h6>
    </div>
    <div className="legend__courses margin-left-tiny center">
      <i className="fa fa-tasks c-white h1" />
      <h6 className="c-white no-margin bold">Course</h6>
    </div>
    <div className="legend__lessons margin-left-tiny center">
      <i className="fa fa-graduation-cap c-white h1" />
      <h6 className="c-white no-margin bold">Lesson</h6>
    </div>
  </div>
);

export default Legend;
