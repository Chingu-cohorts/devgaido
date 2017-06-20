import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import BreadCrumbs from '../shared/BreadCrumbs';

const CourseCard = ({ course, linkTo }) => (
  <Link className="course-card connected" to={linkTo}>
    <div className="course-card-header">
      <span className="course-card-caption">COURSE</span>
      <h1>{course.name}</h1>
    </div>
    <p className="course-description">{course.description}</p>
    <div className="lesson-list">
      {/* getAllCourseLessons(curriculum.courses[id], curriculum).map(lesson => (
        <LessonCard
          name={lesson.name}
          description={lesson.description}
          id={lesson.id}
          type={lesson.type}
          key={lesson.id}
        />
      ))*/}
      <h1 className="completion-text">{course.nCompleted}/{course.nTotal}</h1>
    </div>
  </Link>
);

const Path = ({ match, curriculum }) => {
  const pathId = match.params.id;
  const path = curriculum.paths[match.params.id];

  const courses = path.courseIds.map((courseId) => {
    const course = curriculum.courses[courseId];
    return <CourseCard linkTo={`/paths/${pathId}/${courseId}`} course={course} key={courseId} />;
  });
  return (
    <div className="container">
      <BreadCrumbs curriculum={curriculum} pathId={match.params.id} />
      <div className="grid-full path path-image">
        <div className="path-header path-header-image" />
        <div className="path-header path-header-image-color">
          <h1 className="path-header-path-name">{path.name}</h1>
          <h1 className="completion-text-big">{path.nCompleted}/{path.nTotal}</h1>
        </div>
        {courses}
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.objectOf(PropTypes.shape).isRequired,
  linkTo: PropTypes.string.isRequired,
};

Path.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Path;
