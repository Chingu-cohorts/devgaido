/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import LearningPath from '../shared/LearningPath';
import { togglePath } from './PathsActions';


const getCourseDescription = (courseName, curriculum) => {
  let description = '';
  curriculum.courses.forEach((course) => {
    if (course.name === courseName) {
      description = course.description;
    }
  });
  return description;
};

const getPathCourses = (courseNames, curriculum) => {
  const courses = [];
  courseNames.forEach((courseName) => {
    curriculum.courses.forEach((course, index) => {
      if (course.name === courseName) {
        courses.push(curriculum.courses[index]);
      }
    });
  });
  return courses;
};

const getAllCourseLessons = (courses, curriculum) => {
  const lessons = [];
  courses.forEach((course) => {
    course.lessonNames.forEach((lessonName) => {
      curriculum.lessons.forEach((lesson, index) => {
        if (lessonName === lesson['Lesson Name']) {
          lessons.push(curriculum.lessons[index]);
        }
      });
    });
  });
  return lessons;
};

const toggleItem = (e, id, dispatch) => {
  dispatch(togglePath(id));
};

const openedClass = opened => (opened ? ' opened lostFullWidth' : ' lostGridColumn');

// TODO: Add proper key for courses

const Path = ({ id, name, description, curriculum, dispatch, opened, key, courseNames }) => (
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
    {opened ? courseNames.map((courseName, index) => (
      <div key={index}>
        <div className="courseInfo">
          <h1>{courseName}</h1>
          <p className="courseDescription">{getCourseDescription(courseName, curriculum)}</p>
        </div>
        <LearningPath
          lessons={getAllCourseLessons(getPathCourses([courseName], curriculum), curriculum)}
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
      courseNames: path.courseNames,
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
  courseNames: PropTypes.func.isRequired,
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
