import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import BreadCrumbs from '../shared/BreadCrumbs';

const getCoursesCompletedNumber = (user, path) => {
  let nCompleted = 0;
  path.courseIds.forEach((courseId) => {
    if (user.completionStatus.completedCourses.indexOf(courseId) !== -1) {
      nCompleted += 1;
    }
  });
  return nCompleted;
};

const getLessonsCompletedNumber = (user, course) => {
  let nCompleted = 0;
  course.lessonIds.forEach((lessonId) => {
    if (user.completionStatus.completedLessons.indexOf(lessonId) !== -1) {
      nCompleted += 1;
    }
  });
  return nCompleted;
};

const CourseCard = ({ curriculum, nCompletedLessons, nTotalLessons, pathId, courseId }) => (
  <Link className="course-card connected" to={`/paths/${pathId}/${courseId}`}>
    <div className="course-card-header">
      <span className="course-card-caption">COURSE</span>
      <h1>{curriculum.courses[courseId].name}</h1>
    </div>
    <p className="course-description">{curriculum.courses[courseId].description}</p>
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
      <h1 className="completion-text">{nCompletedLessons}/{nTotalLessons}</h1>
    </div>

  </Link>
);

const Path = ({ match, user, curriculum }) => {
  const path = curriculum.paths[match.params.id];
  const courses = path.courseIds.map(courseId => (
    <CourseCard
      curriculum={curriculum}
      user={user}
      pathId={match.params.id}
      courseId={courseId}
      key={courseId}
      nTotalLessons={curriculum.courses[courseId].lessonIds.length}
      nCompletedLessons={getLessonsCompletedNumber(user, curriculum.courses[courseId])}
    />
  ));
  return (
    <div className="container">
      <BreadCrumbs curriculum={curriculum} pathId={match.params.id} />
      <div className="grid-full path path-image">
        <div className="path-header path-header-image" />
        <div className="path-header path-header-image-color">
          <h1 className="path-header-path-name">{path.name}</h1>
          <h1 className="completion-text-big">{getCoursesCompletedNumber(user, path)}/{path.courseIds.length}</h1>
        </div>
        {courses}
      </div>
    </div>
  );
};
/*
LessonCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};*/
CourseCard.propTypes = {
  pathId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

Path.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Path;
