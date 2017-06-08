import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import LearningPath from '../shared/LearningPath';

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

const Path = ({ match, curriculum }) => {
  const path = getPath(match.params.id, curriculum.paths);
  const courses = path.courseIds.map((courseId, index) => (
    <div key={index}>
      <div className="courseInfo">
        <h1>{curriculum.courses[courseId].name}</h1>
        <p className="courseDescription">{curriculum.courses[courseId].description}</p>
      </div>
      <LearningPath
        lessons={getAllCourseLessons(curriculum.courses[courseId], curriculum)}
        detailedLesson={null}
      />
    </div>
  ));
  return (
    <div className="lostContainer">
      <Link className="backLink" to="/dashboard">&larr; Back</Link>
      <div className="card card--image colFull">
        <div className="cardHeader cardHeader--image" />
        <div className="cardHeader cardHeader--image--color">
          <h1 className="cardHeader--pathName">{path.name}</h1>
        </div>
        <span className="cardSmallCaption">PATH</span>
        <span className="cardBigCaption">{path.name}</span>
        <p className="cardText">{path.description}</p>
        {courses}
        <button className="cardButton" type="button">View</button>
      </div>
    </div>
  );
};

Path.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Path;
