import React from 'react';
import PropTypes from 'prop-types';

import { setCurrentPathId } from '../../actions/userActions';
import { completeLesson } from './LessonActions';

import BreadCrumbs from '../shared/BreadCrumbs';

const Lesson = ({ match, dispatch, curriculum }) => {
  const lessonId = match.params.id;
  const lesson = curriculum.lessons[lessonId];
  const subject = curriculum.subjects[lesson.subject];

  return (
    <div className="container">
      <div className="grid-full lesson lesson-image">
        <div
          className="lesson-header lesson-header-image"
          style={lesson.externalSource !== '' ? {
            background: `url(/assets/screenshots/${lessonId}.jpeg)`,
            backgroundSize: 'cover',
          } : {}}
        />
        <div className="lesson-header lesson-header-image-color2">
          <BreadCrumbs
            curriculum={curriculum}
            pathId={match.params.pid}
            courseId={match.params.cid}
            lessonId={match.params.id}
          />
          <h1 className="path-header-path-name">{lesson.name}</h1>
          <h1 className="completion-text-big">{lesson.completed ? <i className="lesson-status-icon fa fa-check-circle" /> : null}</h1>
        </div>
        <span className="lesson-caption-small">Lesson</span>
        <span className="lesson-caption-small">{lesson.name}</span>
        <span className="lesson-caption-small">Subject</span>
        <span className="lesson-caption-small">{subject.name}</span>
        <span className="lesson-caption-small">{subject.description}</span>
        <p className="lesson-text">{lesson.description}</p>
        <div className="lesson-button-container">
          <a className="lesson-link-button" href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={() => dispatch(setCurrentPathId(match.params.pid))}>START LESSON</a>
          <button className="lesson-button" onClick={() => dispatch(completeLesson(lessonId))}>COMPLETE LESSON</button>
        </div>
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
