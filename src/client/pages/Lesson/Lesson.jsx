import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusThread from 'react-disqus-thread';

import { setCurrentPath } from '../../actions/userActions';
import { completeLesson } from './LessonActions';

import BreadCrumbs from '../shared/BreadCrumbs';

const ItemInfoCard = ({ item, extracontent }) => (
  <div className="card-big">
    <div className="card-big-header card-big-header-lesson">
      <h5 className="card-big-header-text">{item.name}</h5>
      <i className="card-big-header-icon fa fa-info" />
    </div>
    <div className="card-big-content">
      <p className="lesson-text">{item.description ? item.description : 'No description given.'}</p>
      {extracontent}
    </div>
  </div>
);

const PreviewCard = ({ lesson, lessonId }) => (
  <div className="card-big">
    <div className="card-big-header card-big-header-course">
      <h5 className="card-big-header-text">PREVIEW</h5>
      <i className="card-big-header-icon fa fa-eye" />
    </div>
    <div className="card-big-content">
      <div
        className="lesson-preview-img"
        style={lesson.externalSource !== '' ? {
          background: `url(/assets/screenshots/${lessonId}.jpeg)`,
          backgroundSize: 'cover',
        } : {}}
      />
    </div>
  </div>
);

const Lesson = ({ match, dispatch, curriculum }) => {
  const lessonId = match.params.id;
  const lesson = curriculum.lessons[lessonId];
  const subject = curriculum.subjects[lesson.subject];

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-img page-hero-img-desaturate page-hero-img-path" />
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
          <h1 className="completion-text-big">{lesson.completed ? 'completed' : ''}</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <ItemInfoCard
              item={lesson}
              extracontent={
                <div>
                  <h5>{subject.name}</h5>
                  <p>{subject.description}</p>
                </div>
              }
            />
          </div>
          <div className="grid-half">
            <PreviewCard
              lesson={lesson}
              lessonId={lessonId}
            />
          </div>
        </div>
        <div className="lesson-buttons-container">
          <a className="button button-pill button-secondary" href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={() => dispatch(setCurrentPath(match.params.pid, match.params.cid, match.params.id))}>START LESSON</a>
          <button className="button button-pill button-primary" onClick={() => dispatch(completeLesson(lessonId))}>COMPLETE LESSON</button>
        </div>
        <hr />
        <ReactDisqusThread
          shortname="devgaido"
          identifier={`/lesson-${lessonId}`}
          title={lesson.name}
          url={undefined}
          category_id={undefined}
          onNewComment={null}
        />
      </div>
    </div>
  );
};

PreviewCard.propTypes = {
  lesson: PropTypes.objectOf(PropTypes.shape).isRequired,
  lessonId: PropTypes.string.isRequired,
};

ItemInfoCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  extracontent: PropTypes.objectOf(PropTypes.shape).isRequired,
};

Lesson.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Lesson;
