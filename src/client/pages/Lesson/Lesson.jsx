import React from 'react';
import PropTypes from 'prop-types';

const Lesson = ({ match, /* history,*/ curriculum }) => {
  const lesson = curriculum.lessons[match.params.id];
  return (
    <div className="container">
      {/* <a className="backLink" href="#" onClick={() => history.goBack()}>&larr; Back</a>*/}
      <div className="grid-full lesson lesson-image">
        <div className="lesson-header lesson-header-image" />
        <div className="lesson-header lesson-header-image-color2">
          <h1 className="lesson-header-pathName">{lesson.name}</h1>
        </div>
        <span className="lesson-caption-small">Lesson</span>
        <span className="lesson-caption-small">{lesson.name}</span>
        <p className="lesson-text">{lesson.description}</p>
      </div>
    </div>
  );
};

Lesson.propTypes = {
  // history: PropTypes.objectOf(PropTypes.shape).isRequired,
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Lesson;
