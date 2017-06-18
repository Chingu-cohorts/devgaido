import React from 'react';
import PropTypes from 'prop-types';

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

const getAllCourseLessons = (course, curriculum) => {
  const lessons = [];
  course.lessonIds.forEach((lessonId) => {
    lessons.push(curriculum.lessons[lessonId]);
  });
  return lessons;
};

const LessonCard = ({ name, description, to, type }) => (
  <Card
    caption={name}
    subcaption="LESSON"
    text={description}
    to={to}
    content={null}
    icons={[lessonTypeIcons[type], 'fa fa-graduation-cap']}
    color={lessonTypeColors[type]}
  />
);

const Course = ({ match, curriculum }) => {
  const course = curriculum.courses[match.params.id];
  return (
    <div className="container">
      <BreadCrumbs curriculum={curriculum} pathId={match.params.pid} courseId={match.params.id} />
      <div className="grid-full path path-image">
        <div className="path-header path-header-image" />
        <div className="path-header path-header-image-color">
          <h1 className="path-header-path-name">{course.name}</h1>
        </div>
        <p className="card-text">{course.description}</p>
        <div className="lesson-list">
          {getAllCourseLessons(curriculum.courses[match.params.id], curriculum).map(lesson => (
            <LessonCard
              name={lesson.name}
              description={lesson.description}
              id={lesson.id}
              type={lesson.type}
              key={lesson.id}
              to={`/paths/${match.params.pid}/${match.params.id}/${lesson.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

LessonCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Course.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Course;
