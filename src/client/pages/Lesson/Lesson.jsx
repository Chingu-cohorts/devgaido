import React from 'react';
import PropTypes from 'prop-types';

import { completeLesson, unCompleteLesson } from './LessonActions';

import BreadCrumbs from '../shared/BreadCrumbs';

const Lesson = ({ match, dispatch, curriculum }) => {
  const lessonId = match.params.id;
  const lesson = curriculum.lessons[lessonId];
  const subject = curriculum.subjects[lesson.subject];

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
          <h1 className="">{lesson.completed ? 'Completed' : 'Incomplete'}</h1>
        </div>
        <span className="lesson-caption-small">Lesson</span>
        <span className="lesson-caption-small">{lesson.name}</span>
        <span className="lesson-caption-small">Subject</span>
        <span className="lesson-caption-small">{subject.name}</span>
        <span className="lesson-caption-small">{subject.description}</span>
        <p className="lesson-text">{lesson.description}</p>
        <a className="button" href={lesson.externalSource} target="_blank" rel="noopener noreferrer">START LESSON</a>
        <button onClick={() => dispatch(completeLesson(lessonId))}>COMPLETE LESSON</button>
        <button onClick={() => dispatch(unCompleteLesson(lessonId))}>UNCOMPLETE LESSON</button>
      </div>
    </div>
  );
};

Lesson.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Lesson;
