import React from 'react';
import PropTypes from 'prop-types';

const ExternalLesson = ({ url }) => (
  <iframe src={url} height="500" width="1600" />
);

ExternalLesson.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ExternalLesson;
