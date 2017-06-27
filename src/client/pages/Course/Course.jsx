import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import BreadCrumbs from '../shared/BreadCrumbs';
import Card from '../shared/Card';

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
  <Link className="connected" to={linkTo}>
    <div className="card-big">
      <div className="card-big-header card-big-header-lesson">
        <h5 className="card-big-header-text">{course.name}</h5>
        <span className="card-big-header-text-extra">LESSON</span>
      </div>
      <div className="card-big-content">
        <p>{course.description}</p>
        <h2 className="completion-text">incomplete</h2>
      </div>
    </div>
  </Link>
);

const ItemInfoCard = ({ item }) => (
  <div className="card-big">
    <div className="card-big-header card-big-header-course">
      <h5 className="card-big-header-text">{item.name}</h5>
      <i className="card-big-header-icon fa fa-info" />
    </div>
    <div className="card-big-content">
      <p>{item.description}</p>
    </div>
  </div>
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
        <div className="page-hero-color-overlay page-hero-color-overlay-course" />
        <div className="page-hero-container">
          <BreadCrumbs curriculum={curriculum} pathId={match.params.pid} courseId={match.params.id} />
          <h1 className="page-hero-name">{course.name}</h1>
          <h1 className="completion-text-big completion-text-big-left">COURSE</h1>
          <h1 className="completion-text-big">{course.nCompleted}/{course.nTotal}</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <ItemInfoCard item={course} />
          </div>
          <div className="grid-half">
            {lessons}
          </div>
        </div>
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

ItemInfoCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

Course.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Course;
