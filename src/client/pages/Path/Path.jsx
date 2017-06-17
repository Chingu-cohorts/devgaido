import React from 'react';
import PropTypes from 'prop-types';

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

const getPath = (id, paths) => {
  let retPath = null;
  paths.forEach((path) => {
    if (path.id === id) {
      retPath = path;
    }
  });
  return retPath;
};

const getAllCourseLessons = (course, curriculum) => {
  const lessons = [];
  course.lessonIds.forEach((lessonId) => {
    lessons.push(curriculum.lessons[lessonId]);
  });
  return lessons;
};

const LessonCard = ({ name, description, id, type }) => (
  <Card
    caption={name}
    subcaption="LESSON"
    text={description}
    to={`/lessons/${id}`}
    content={null}
    icons={[lessonTypeIcons[type], 'fa fa-graduation-cap']}
    color={lessonTypeColors[type]}
  />
);

const Path = ({ match, /* history,*/ curriculum }) => {
  const path = getPath(match.params.id, curriculum.paths);
  const courses = path.courseIds.map((courseId, index) => (
    <div className="course-card" key={index}>
      <div className="course-card-header">
        <span className="course-card-caption">Course</span>
        <h1>{curriculum.courses[courseId].name}</h1>
      </div>
      <p className="course-description">{curriculum.courses[courseId].description}</p>
      
      <div className="lesson-list">
        {getAllCourseLessons(curriculum.courses[courseId], curriculum).map(lesson => (
          <LessonCard
            name={lesson.name}
            description={lesson.description}
            id={lesson.id}
            type={lesson.type}
            key={lesson.id}
          />
        ))}
      </div>
    </div>
  ));
  return (
    <div className="container">
      {/* <a className="backLink" href="#" onClick={() => history.goBack()}>&larr; Back</a>*/}
      <div className="grid-full path path-image ">
        <div className="path-header path-header-image" />
        <div className="path-header path-header-image-color">
          <h1 className="path-header-path-name">{path.name}</h1>
        </div>
        <div className= "path-info">
          <span className="path-caption-big">About this Path:</span>
          <p className="path-text">{path.description}</p>
          <p className="path-text">Courses in this path: {courses.length}</p>
        </div>
        {courses}
      </div>
    </div>
  );
};

LessonCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};


Path.propTypes = {
  // history: PropTypes.objectOf(PropTypes.shape).isRequired,
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Path;
