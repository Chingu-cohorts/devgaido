import React from 'react';
import PropTypes from 'prop-types';

const OptionalPathInfo = ({ path }) => {
  if (!(path.salary || path.goal)) {
    return null;
  }
  return (
    <div className="flex flex-column-below-t margin-top-big margin-top-small-below-t">
      <div className="width-50-above-t margin-right-small-above-t">
        <h4 className="center uppercase c-primary margin-bottom-tiny">Goal</h4>
        <p className="no-margin">{path.goal ? path.goal : ''}</p>
      </div>
      <div className="width-50-above-t margin-top-big-below-t">
        <h4 className="center c-primary uppercase margin-bottom-tiny uppercase">Estimated Salary</h4>
        {path.salary ?
          <div className="center">
            <p>{path.salary[1]}</p>
            <h3 className="c-accent no-margin">{path.salary[0]}</h3>
          </div> : null}
      </div>
    </div>
  );
};

OptionalPathInfo.propTypes = {
  path: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default OptionalPathInfo;
