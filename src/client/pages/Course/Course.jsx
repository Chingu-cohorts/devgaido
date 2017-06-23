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

const Course = ({ match, curriculum }) => {
  const course = curriculum.courses[match.params.id];
  return (
    <div className="container">
      <div className="grid-full path path-image">
        <div className="path-header path-header-image" />
        <div className="path-header path-header-image-color">
          <BreadCrumbs curriculum={curriculum} pathId={match.params.pid} courseId={match.params.id} />
          <h1 className="path-header-path-name">{course.name}</h1>
          <h1 className="completion-text-big">{course.nCompleted}/{course.nTotal}</h1>
        </div>
        <p className="card-text">{course.description}</p>
        <div className="lesson-list">
          { course.lessonIds.map((lessonId) => {
            const lesson = curriculum.lessons[lessonId];
            return (
              <LessonCard
                name={lesson.name}
                description={lesson.description}
                type={lesson.type}
                key={lessonId}
                linkTo={`/paths/${match.params.pid}/${match.params.id}/${lessonId}`}
              />
            );
          })}
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

Course.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Course;
