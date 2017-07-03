import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LessonSlider from './LessonSlider';
import PathList from './PathList';

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
    )
  );
};

const CurrentPathSection = ({ curPath, curriculum, user, history, onViewClick }) => (
  <div className="current-path">
    <span>CURRENT PATH</span>
    <h2>{curPath.name}</h2>
    <button className="button button-pill abs-top-right" onClick={onViewClick}>VIEW FULL PATH</button>
    <p className="course-description">{curPath.description}</p>
    <LessonSlider user={user} curriculum={curriculum} history={history} />
  </div>
);

const InProgressSection = ({ inProgressPaths, curriculum }) => (
  <div className="inprogress-tab margin-top-big">
    <span>PATHS</span>
    <h2>InProgress</h2>
    <PathList pathIds={inProgressPaths} curriculum={curriculum} /> :
  </div>
);

const InProgressTab = ({ user, curriculum, history }) => {
  const inProgressPaths = getInProgressPaths(curriculum);

  return (
    <div>
      {user.curPathId !== '' ?
        <div>
          <CurrentPathSection
            curPath={curriculum.paths[user.curPathId]}
            curriculum={curriculum}
            user={user}
            history={history}
            onViewClick={() => history.push(`/paths/${user.curPathId}`)}
          />
          {inProgressPaths.length !== 0 ?
            <InProgressSection
              inProgressPaths={inProgressPaths}
              curriculum={curriculum}
              show={user.curPathId !== '' && inProgressPaths.length !== 0}
            /> : null }
        </div> :
        <div className="center margin-top-big">
          <h3>You haven&apos;t started any paths yet.</h3>
          <Link className="button button-pill bg-primary c-white border-primary" to="/paths">BROWSE PATHS</Link>
        </div>}
    </div>
  );
};

CurrentPathSection.propTypes = {
  curPath: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  onViewClick: PropTypes.func.isRequired,
};

InProgressSection.propTypes = {
  inProgressPaths: PropTypes.arrayOf(PropTypes.string).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

InProgressTab.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default InProgressTab;
