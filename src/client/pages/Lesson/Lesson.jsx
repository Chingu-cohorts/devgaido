import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusThread from 'react-disqus-thread';

import { setCurrentPathId } from '../../actions/userActions';
import { completeLesson } from './LessonActions';

import BreadCrumbs from '../shared/BreadCrumbs';

const ItemInfoCard = ({ item, extracontent }) => (
  <div className="card-big">
    <div className="card-big-header card-big-header-lesson">
      <h5 className="card-big-header-text">{item.name}</h5>
      <i className="card-big-header-icon fa fa-info" />
    </div>
    <div className="card-big-content">
      <p>{item.description}</p>
      {extracontent}
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
          <div className="grid-half-offset">
            <ItemInfoCard
              item={lesson}
              extracontent={
                <div>
                  <p className="lesson-text">{lesson.description ? lesson.description : 'No description given.'}</p>
                  <h5>{subject.name}</h5>
                  <p>{subject.description}</p>
                </div>
              }
            />
          </div>
        </div>
        <div className="lesson-buttons-container">
          <a className="button button-pill button-secondary" href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={() => dispatch(setCurrentPathId(match.params.pid))}>START LESSON</a>
          <button className="button button-pill button-primary" onClick={() => dispatch(completeLesson(lessonId))}>COMPLETE LESSON</button>
        </div>
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
