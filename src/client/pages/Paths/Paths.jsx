/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import LearningPath from '../shared/LearningPath';
import { togglePath } from './PathsActions';

/*
const getPathCourses = (courseIds, curriculum) => {
  const courses = [];
  courseIds.forEach((courseId) => {
    courses.push(curriculum.courses[courseId]);
  });
  return courses;
};
*/

const getAllCourseLessons = (course, curriculum) => {
  const lessons = [];
  course.lessonIds.forEach((lessonId) => {
    lessons.push(curriculum.lessons[lessonId]);
  });
  return lessons;
};

const toggleItem = (e, id, dispatch) => {
  dispatch(togglePath(id));
};

const openedClass = opened => (opened ? ' opened lostFullWidth' : ' lostGridColumn');

const Path = ({ id, name, description, curriculum, dispatch, opened, key, courseIds }) => (
  <div className={`learning-path-item${openedClass(opened)}`} onClick={e => toggleItem(e, id, dispatch)} key={key}>
    <div className="learning-path-item-header">
      <i className="path-icon" />
      <i className="no-icon" />
    </div>
    <span className="learning-path-category">Path</span>
    <h3 className="learning-path-item-name">{name}</h3>
    <ul>
      <li className="learning-path-item-subject">{description}</li>
    </ul>
    {opened ? courseIds.map(courseId => (
      <div>
        <div className="courseInfo">
          <h1>{curriculum.courses[courseId].name}</h1>
          <p className="courseDescription">{curriculum.courses[courseId].description}</p>
        </div>
        <LearningPath
          lessons={getAllCourseLessons(curriculum.courses[courseId], curriculum)}
          detailedLesson={null}
        />
      </div>
      )) : null}
    <div className="learning-path-item-footer">
      <a className="view-item" href="/">Explore</a>
    </div>
  </div>
);

const Paths = ({ curriculum, uiState, dispatch }) => {
  const pathsArr = [];

  curriculum.paths.forEach((path, index) => {
    pathsArr.push(Path({
      key: uiState.Pages.Paths.pathStates[index].id,
      id: uiState.Pages.Paths.pathStates[index].id,
      dispatch,
      name: path.name,
      opened: uiState.Pages.Paths.pathStates[index].opened,
      description: path.description,
      courseIds: path.courseIds,
      curriculum,
    }));
  });

  return (
    <div className="lostContainer">
      {pathsArr}
    </div>
  );
};

Path.propTypes = {
  id: PropTypes.number.isRequired,
  key: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  curriculum: PropTypes.func.isRequired,
  courseIds: PropTypes.func.isRequired,
};

Paths.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape),
  curriculum: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
};

Paths.defaultProps = {
  uiState: null,
  curriculum: null,
  dispatch: null,
};

export default Paths;
