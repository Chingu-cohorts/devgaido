import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusThread from 'react-disqus-thread';
import { Link } from 'react-router-dom';

import BreadCrumbs from '../shared/BreadCrumbs';
import Card from '../shared/Card';
import InfoCard from '../shared/InfoCard';

const lessonTypeIcons = {
  Reading: 'fa fa-book',
  Project: 'fa fa-tasks',
  'Supplemental Course': '',
};

const lessonTypeColors = {
  Reading: '#ffea7e',
  Project: 'deepskyblue',
  'Supplemental Course': '',
};

const LessonCard = ({ name, description, linkTo, type }) => (
  <Card
    caption={name}
    subcaption="LESSON"
    text={description}
    linkTo={linkTo}
    content={null}
    icons={[lessonTypeIcons[type], 'fa fa-graduation-cap']}
    color={lessonTypeColors[type]}
  />
);

const CourseCard = ({ course, linkTo }) => (
  <Link className="connected connected-course" to={linkTo}>
    <div className="card-big">
      <div className="card-big-header card-big-header-lesson">
        <h5 className="card-big-header-text">{course.name}</h5>
        <span className="card-big-header-text-extra">LESSON</span>
      </div>
      <div className="card-big-content">
        <p>{course.description ? course.description : 'No description given.'}</p>
        <h4 className="completion-text">{course.completed ? 'completed' : ''}</h4>
      </div>
    </div>
  </Link>
);

const Course = ({ match, curriculum }) => {
  const pathId = match.params.pid;
  const courseId = match.params.id;
  const course = curriculum.courses[courseId];

  const lessons = course.lessonIds.map((lessonId) => {
    const lesson = curriculum.lessons[lessonId];
    return <CourseCard linkTo={`/paths/${pathId}/${courseId}/${lessonId}`} course={lesson} key={lessonId} />;
  });
  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-img page-hero-img-desaturate page-hero-img-path" />
        <div className="page-hero-color-overlay page-hero-color-overlay-course" />
        <div className="page-hero-container">
          <BreadCrumbs
            curriculum={curriculum}
            pathId={pathId}
            courseId={courseId}
            invertIconColors
          />
          <h1 className="page-hero-name">{course.name}</h1>
          <h2 className="completion-text-big completion-text-big-left">COURSE</h2>
          <h2 className="completion-text-big">{course.nCompleted}/{course.nTotal}</h2>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <InfoCard item={course} color="primary" />
          </div>
          <div className="grid-half">
            {lessons}
          </div>
        </div>
        <hr />
        <ReactDisqusThread
          shortname="devgaido"
          identifier={`/course-${courseId}`}
          title={course.name}
          url={undefined}
          category_id={undefined}
          onNewComment={null}
        />
      </div>
    </div>
  );
};

LessonCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

CourseCard.propTypes = {
  course: PropTypes.objectOf(PropTypes.shape).isRequired,
  linkTo: PropTypes.string.isRequired,
};

Course.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Course;
