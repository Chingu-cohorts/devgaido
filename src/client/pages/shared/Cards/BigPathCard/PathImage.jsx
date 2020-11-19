import React from 'react';
import PropTypes from 'prop-types';

const PathImage = ({ path }) => (
  <div className="path-image margin-bottom-big margin-bottom-small-below-t">
    <div className="preview border-round" style={{ background: `url(/paths/${path.id}.jpg)`, backgroundSize: 'cover' }} />
  </div>
);

PathImage.propTypes = {
  path: PropTypes.objectOf(PropTypes.shape).isRequired,
};


export default PathImage;
