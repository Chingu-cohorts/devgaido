import React from 'react';
import PropTypes from 'prop-types';

import { setCurrentPathId } from '../../actions/userActions';
import { completeLesson } from './LessonActions';

import BreadCrumbs from '../shared/BreadCrumbs';

const ItemInfoCard = ({ item }) => (
  <div className="card-big">
    <div className="card-big-header card-big-header-lesson">
      <h5 className="card-big-header-text">{item.name}</h5>
      <i className="card-big-header-icon fa fa-info" />
    </div>
    <div className="card-big-content">
      <p>{item.description}</p>
    </div>
  </div>
);

const Lesson = ({ match, dispatch, curriculum }) => {
  const lessonId = match.params.id;
  const lesson = curriculum.lessons[lessonId];
  const subject = curriculum.subjects[lesson.subject];

  return (
    <div>
      <div
        className="page-hero"
        style={lesson.externalSource !== '' ? {
          background: `url(/assets/screenshots/${lessonId}.jpeg)`,
          backgroundSize: 'cover',
        } : {}}
      >
        <div className="page-hero-color-overlay page-hero-color-overlay-lesson" />
        <div className="page-hero-container">
          <BreadCrumbs
            curriculum={curriculum}
            pathId={match.params.pid}
            courseId={match.params.cid}
            lessonId={match.params.id}
          />
          <h1 className="page-hero-name">{lesson.name}</h1>
          <h1 className="completion-text-big completion-text-big-left">LESSON</h1>
          <h1 className="completion-text-big">incomplete</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <ItemInfoCard item={lesson} />
          </div>
          <div className="grid-half">
            <div>
              <h5>{lesson.name}</h5>
              <h5>Subject</h5>
              <h5>{subject.name}</h5>
              <p>{subject.description}</p>
            </div>
            
            <p className="lesson-text">{lesson.description}</p>
            <div className="lesson-button-container">
              <a className="button" href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={() => dispatch(setCurrentPathId(match.params.pid))}>COMPLETE LESSON</a>
              <button className="button" onClick={() => dispatch(completeLesson(lessonId))}>COMPLETE LESSON</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ItemInfoCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};


Lesson.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Lesson;
