import React from 'react';
import PropTypes from 'prop-types';

import actions from '../../../../actions';

const {
  setCurrentPath,
  setLastTouchedLesson,
} = actions;

const LessonPreviewImage = ({ lesson, user }) => {
  const handleClick = user.authenticated ? () => {
    setCurrentPath(user.lastPathId);
    setLastTouchedLesson(lesson.id);
  } : null;

  return (
    <div className="lesson-preview margin-bottom-big margin-bottom-small-below-t">
      <a href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
        <div className="preview border-round" style={{ background: `url(/screenshots/${lesson.id}.jpg)`, backgroundSize: 'cover' }} />
      </a>
    </div>
  );
};

LessonPreviewImage.propTypes = {
  lesson: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default LessonPreviewImage;
