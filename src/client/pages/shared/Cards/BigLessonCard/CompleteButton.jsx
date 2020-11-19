import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../shared/Button';
import actions from '../../../../actions';

const {
  setCurrentPath,
  setLastTouchedLesson,
  completeLesson,
  unCompleteLesson,
  toggleModal,
} = actions;

const CompleteButton = ({ lesson, user }) => {
  const handleClick = !lesson.completed ?
    () => {
      completeLesson(lesson.id, lesson.version);
      toggleModal();
      setCurrentPath(user.lastPathId);
      setLastTouchedLesson(lesson.id);
    } :
    () => unCompleteLesson(lesson.id, lesson.version);

  const caption = !lesson.completed ? 'Complete Lesson' : 'Un-Complete Lesson';

  return (
    <Button className="button--accent" icon="icon-check-square-o" onClick={handleClick}>{caption}</Button>
  );
};

CompleteButton.propTypes = {
  lesson: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default CompleteButton;
