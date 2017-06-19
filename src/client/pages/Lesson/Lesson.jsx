import React from 'react';
import PropTypes from 'prop-types';

import { completeLesson, unCompleteLesson } from './LessonActions';

import BreadCrumbs from '../shared/BreadCrumbs';

const Lesson = ({ match, dispatch, curriculum }) => {
  const lesson = curriculum.lessons[match.params.id];
  return (
    <div className="container">
      <BreadCrumbs
        curriculum={curriculum}
        pathId={match.params.pid}
        courseId={match.params.cid}
        lessonId={match.params.id}
      />
      <div className="grid-full lesson lesson-image">
        <div className="lesson-header lesson-header-image" />
        <div className="lesson-header lesson-header-image-color2">
          <h1 className="lesson-header-path-name">{lesson.name}</h1>
        </div>
        <span className="lesson-caption-small">Lesson</span>
        <span className="lesson-caption-small">{lesson.name}</span>
        <p className="lesson-text">{lesson.description}</p>
        <button onClick={() => dispatch(completeLesson(match.params.id, curriculum))}>COMPLETE LESSON</button>
        <button onClick={() => dispatch(unCompleteLesson(match.params.id, curriculum))}>UNCOMPLETE LESSON</button>
      </div>
    </div>
  );
};

Lesson.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Lesson;
