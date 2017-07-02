import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusThread from 'react-disqus-thread';

import { setCurrentPath } from '../../actions/userActions';
import { completeLesson } from './LessonActions';

import BreadCrumbs from '../shared/BreadCrumbs';
import InfoCard from '../shared/InfoCard';

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
          {lesson.completed ? <i className="page-hero-icon page-hero-icon-bottom-right fa fa-check-circle-o" /> : null}
          <i className="page-hero-icon fa fa-graduation-cap" />
        </div>
      </div>

      <div className="middle-header">
        <div className="container middle-header-content">
          <button className="button button-pill button-primary no-margin invis">Bookmark Lesson</button>
          <div className="lesson-buttons-container">
            <a className="button button-pill button-secondary" href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={() => dispatch(setCurrentPath(match.params.pid, match.params.cid, match.params.id))}>START LESSON</a>
            <button className="button button-pill button-primary" onClick={() => dispatch(completeLesson(lessonId))}>COMPLETE LESSON</button>
          </div>
          {/* user.bookmarkedPaths.indexOf(pathId) === -1 ?
            <button className="button button-pill button-primary no-margin" onClick={() => dispatch(addBookmark(pathId))}>Bookmark Course</button> :
            <button className="button button-pill button-secondary no-margin" onClick={() => dispatch(removeBookmark(pathId))}>Remove Course</button>*/}
          <button className="button button-pill button-primary no-margin">Bookmark Lesson</button>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <InfoCard
              item={lesson}
              extraContent={{
                name: subject.name,
                description: subject.description,
              }}
            />
          </div>
          <div className="grid-half">
            <PreviewCard
              lesson={lesson}
              lessonId={lessonId}
            />
          </div>
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

Lesson.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Lesson;
