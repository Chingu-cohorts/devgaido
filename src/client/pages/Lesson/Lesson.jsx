import React from 'react';
import PropTypes from 'prop-types';

import BreadCrumbs from '../shared/BreadCrumbs';

const Lesson = ({ match, curriculum }) => {
  const lesson = curriculum.lessons[match.params.id];
  return (
    <div className="container">
      <BreadCrumbs
        curriculum={curriculum}
        pathId={match.params.pid}
        courseId={match.params.cid}
        lessonId={match.params.id}
      />
      {/* <a className="backLink" href="#" onClick={() => history.goBack()}>&larr; Back</a>*/}
      <div className="grid-full lesson lesson-image">
        <div className="lesson-header lesson-header-image" />
        <div className="lesson-header lesson-header-image-color2">
          <h1 className="lesson-header-path-name">{lesson.name}</h1>

        </div>
        <span className="lesson-caption-small">Lesson</span>
        <span className="lesson-caption-small">{lesson.name}</span>
        <p className="lesson-text">{lesson.description}</p>
      </div>
    </div>
  );
};

Lesson.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Lesson;
