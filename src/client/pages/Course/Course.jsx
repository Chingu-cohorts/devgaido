import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusThread from 'react-disqus-thread';
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
  <Link className="connected connected-course" to={linkTo}>
    <div className="card-big">
      <div className="card-big-header card-big-header-lesson">
        <h5 className="card-big-header-text">{course.name}</h5>
        <span className="card-big-header-text-extra">LESSON</span>
      </div>
      <div className="card-big-content">
        <p>{course.description ? course.description : 'No description given.'}</p>
        {course.completed ? <i className="completion-icon fa fa-check-circle-o" /> : null}
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
          <i className="page-hero-icon fa fa-tasks" />
          {course.completed ? <i className="page-hero-icon page-hero-icon-bottom-right fa fa-check-circle-o" /> : null}
        </div>
      </div>
      <div className="middle-header">
        <div className="container middle-header-content">
          <button className="button button-pill button-primary no-margin invis">Bookmark Course</button>
          <span className="middle-header-text">Lessons completed: {course.nCompleted}/{course.nTotal}</span>
          {/* user.bookmarkedPaths.indexOf(pathId) === -1 ?
            <button className="button button-pill button-primary no-margin" onClick={() => dispatch(addBookmark(pathId))}>Bookmark Course</button> :
            <button className="button button-pill button-secondary no-margin" onClick={() => dispatch(removeBookmark(pathId))}>Remove Course</button>*/}
          <button className="button button-pill button-primary no-margin">Bookmark Course</button>
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

ItemInfoCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

Course.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Course;
