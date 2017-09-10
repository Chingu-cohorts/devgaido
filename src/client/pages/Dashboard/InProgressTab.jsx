import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ItemList from './ItemList';
import AnimateVisibleChildren from '../shared/AnimateVisibleChildren';

const CurrentPathSection = ({ path, curriculum }) => (
  <div className="inprogress-tab margin-bottom-small">
    <span>PATH</span>
    <h2>Last Worked On</h2>
    <p className="margin-bottom-big">This section shows you the last path you were working on.</p>
    <ItemList items={[path]} curriculum={curriculum} category="paths" />
  </div>
);

const CurrentLessonSection = ({ lesson, curriculum }) => (
  <div className="inprogress-tab margin-bottom-small">
    <span>LESSON</span>
    <h2>Last Viewed</h2>
    <p className="margin-bottom-big">This section shows the last lesson you viewed.</p>
    <ItemList items={[lesson]} curriculum={curriculum} category="lessons" />
  </div>
);


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
    <span>ALL PATHS</span>
    <h2>In Progress</h2>
    <p className="margin-bottom-big">This section shows you all the paths which have at least one lesson in them you completed. Since lessons can be shared across paths it will show you ALL paths that a completed lesson is in.</p>
    <ItemList items={inProgressPaths} curriculum={curriculum} category="paths" />
  </div>
);

const InProgressTab = ({ user, curriculum }) => {
  const inProgressPaths = getInProgressPaths(curriculum);
  const currentPath = user.curPathId ? curriculum.paths[user.curPathId] : null;
  const currentLesson = user.lastLessonId ? curriculum.lessons[user.lastLessonId] : null;

  return (
    <AnimateVisibleChildren>
      {currentLesson ?
        <CurrentLessonSection lesson={currentLesson} curriculum={curriculum} /> : null}
      {currentPath ?
        <CurrentPathSection path={currentPath} curriculum={curriculum} /> : null}
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
            <Link className="button button--primary uppercase" to="/library">
              <div className="flex items-center">
                <i className="fa icon-search margin-right-tiny" />
                Browse Library
              </div>
            </Link>
          </div>
        </div>}
    </AnimateVisibleChildren>
  );
};

CurrentPathSection.propTypes = {
  path: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

CurrentLessonSection.propTypes = {
  lesson: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

InProgressSection.propTypes = {
  inProgressPaths: PropTypes.arrayOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

InProgressTab.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
  curriculum: store.curriculum,
}))(InProgressTab);
