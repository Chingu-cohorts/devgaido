import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from '../../../shared/LinkButton';
import actions from '../../../../actions';

const {
  setCurrentPath,
  setLastTouchedLesson,
} = actions;

const OpenButton = ({ lesson, user }) => {
  const handleClick = user ? () => {
    setCurrentPath(user.lastPathId);
    setLastTouchedLesson(lesson.id);
  } : null;
  return (
    <LinkButton className="button--primary" href={lesson.externalSource} onClick={handleClick}>Open Lesson</LinkButton>
  );
};

OpenButton.propTypes = {
  lesson: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default OpenButton;
