import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LessonSlider from './LessonSlider';
import ItemList from './ItemList';

const isInProgress = (path, courses, lessons) => {
  let inProgress = false;
  path.courseIds.forEach((courseId) => {
    const course = courses[courseId];
    if (course) {
      course.lessonIds.forEach((lessonId) => {
        if (lessons[lessonId].completed) {
          inProgress = true;
        }
      });
    }
  });
  return inProgress;
};

const getInProgressPaths = (curriculum) => {
  const paths = curriculum.paths;
  const courses = curriculum.courses;
  const lessons = curriculum.lessons;
  return (
    Object.keys(paths).filter(
        pathId => !paths[pathId].completed && isInProgress(paths[pathId], courses, lessons),
    ).map(pathId => paths[pathId])
  );
};

const InProgressSection = ({ inProgressPaths, curriculum }) => (
  <div className="inprogress-tab margin-bottom-huge">
    <span>PATHS</span>
    <h2>In Progress</h2>
    <ItemList items={inProgressPaths} curriculum={curriculum} category="paths" /> :
  </div>
);

const InProgressTab = ({ user, curriculum }) => {
  const inProgressPaths = getInProgressPaths(curriculum);

  return (
    <div>
      {inProgressPaths.length !== 0 ?
        <InProgressSection
          inProgressPaths={inProgressPaths}
          curriculum={curriculum}
          show={user.curPathId !== '' && inProgressPaths.length !== 0}
        /> :
        <div className="inprogress-tab margin-bottom-huge">
          <span>PATHS</span>
          <h2>In Progress</h2>
          <div className="center margin-top-huge">
            <h3>You haven&apos;t started any paths yet.</h3>
            <Link className="button button--primary uppercase" to="/library">Browse Library</Link>
          </div>
        </div>}
    </div>
  );
};

InProgressSection.propTypes = {
  inProgressPaths: PropTypes.arrayOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

InProgressTab.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default InProgressTab;
