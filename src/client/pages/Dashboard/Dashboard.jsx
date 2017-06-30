import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '../shared/Card';

import TabbedContent from './TabbedContent';

// TODO: Add custom date formatting to make client and server side string match up
const Metrics = ({ user, curriculum }) => (
  <div className="metrics">
    <div className="metric">
      <h6 className="metric-text">Completed:</h6>
    </div>
    <div className="metric">
      <h1 className="metric-number">{Object.keys(curriculum.paths).filter(
          pathId => curriculum.paths[pathId].completed,
      ).length}</h1>
      <h6 className="metric-text metric-text-bold">Paths</h6>
    </div>
    <div className="metric">
      <h1 className="metric-number">{Object.keys(curriculum.courses).filter(
          courseId => curriculum.courses[courseId].completed,
      ).length}</h1>
      <h6 className="metric-text metric-text-bold">Courses</h6>
    </div>
    <div className="metric">
      <h1 className="metric-number">{Object.keys(curriculum.lessons).filter(
          lessonId => curriculum.lessons[lessonId].completed,
      ).length}</h1>
      <h6 className="metric-text metric-text-bold">Lessons</h6>
    </div>
  </div>
);

const CourseCardMini = ({ course, transparent, offset, first, last }) => (
  <div className={`col-quarter connected-horizontal ${last ? ' mini-last' : ''} ${first ? ' mini-first' : ''} ${transparent ? ' mini-transparent' : ''} ${offset ? ' mini-offset' : ''}`}>
    <div className="card-big card-big-catalog">
      <div className="card-big-header card-big-header-course">
        <h5 className="card-big-header-text">{course.name}</h5>
        <i className="card-big-header-icon fa fa-book" />
      </div>
      <div className="card-big-content">
        <p>{course.description}</p>
        <h4 className="completion-text">{course.nCompleted}/{course.nTotal}</h4>
      </div>
    </div>
  </div>
);
const getCurrentCourses = (courseIds, curriculum) => {
  let lastCompleted = -1;
  const currentCourseIds = [];

  for (let i = 0; i < courseIds.length; i += 1) {
    if (curriculum.courses[courseIds[i]].completed) {
      lastCompleted = i;
    } else {
      break;
    }
  }

  lastCompleted -= 1;
  if (lastCompleted < 0) {
    lastCompleted = 0;
  }

  for (let j = 0; j < 3; j += 1) {
    if (lastCompleted + j >= courseIds.length) {
      break;
    }
    currentCourseIds.push(courseIds[lastCompleted + j]);
  }
  const firstCourse = lastCompleted === 0;
  const lastCourse = lastCompleted + 4 > courseIds.length;
  const isSmallerThan3 = currentCourseIds.length !== 3;

  if (!isSmallerThan3 && firstCourse) {
    currentCourseIds.pop();
  }

  return {
    courseMinis: currentCourseIds.map(
      (courseId, index, arr) => (
        <CourseCardMini
          course={curriculum.courses[courseId]}
          key={courseId}
          offset={isSmallerThan3 || firstCourse}
          transparent={isSmallerThan3 ? (index + 1) % 2 === 0 : index % 2 === 0}
          first={firstCourse && index === 0}
          last={lastCourse && index === arr.length - 1}
        />
      )),
    curCourseId: courseIds[lastCompleted],
  };
};

const CurrentPathCard = ({ curPath, curriculum, onViewClick, onContinueClick }) => {
  const {
    courseMinis: currentCourses,
    curCourseId,
 } = getCurrentCourses(curPath.courseIds, curriculum);

  return (
    <div className="section">
      <div className="section-header">
        <span>CURRENT PATH</span>
        <h1>{curPath.name}</h1>
        <button className="button button-pill section-action-button" onClick={() => onViewClick()}>VIEW FULL PATH</button>
      </div>
      <div className="section-content">
        <p className="course-description">{curPath.description}</p>
        <div className="path-list course-minis">
          {currentCourses}
          <div className="center-button-container">
            <button className="button button-pill button-primary" onClick={() => onContinueClick(curCourseId)} ><i />CONTINUE PATH</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PathCard = ({ path, pathId }) => (
  <Link className="col-quarter" to={`/paths/${pathId}`} >
    <div className="card-big card-big-catalog">
      <div className="card-big-header card-big-header-path">
        <h5 className="card-big-header-text">{path.name}</h5>
        <i className="card-big-header-icon fa fa-road" />
      </div>
      <div className="card-big-content">
        <p>{path.description}</p>
        <h4 className="completion-text">{path.nCompleted}/{path.nTotal}</h4>
      </div>
    </div>
  </Link>
);

const isInProgress = (user, curriculum, pathId) => {
  const path = curriculum.paths[pathId];

  let inProgress = false;
  path.courseIds.forEach((courseId) => {
    const course = curriculum.courses[courseId];
    if (course) {
      course.lessonIds.forEach((lessonId) => {
        if (curriculum.lessons[lessonId].completed) {
          inProgress = true;
        }
      });
    }
  });
  return inProgress;
};

const PathList = ({ pathIds, curriculum }) => (
  <div className="path-list">
    {pathIds.map((pathId) => {
      const path = curriculum.paths[pathId];
      return (
        <PathCard path={path} pathId={pathId} key={pathId} />
      );
    })}
  </div>
);
const NoPaths = ({ text, showPathButton }) => (
  <div className="no-paths">
    <h3>{text}</h3>
    {showPathButton ? <Link className="button button-pill no-paths-button" to="/paths">BROWSE PATHS</Link> : null}
  </div>
);

const Dashboard = ({ dispatch, user, curriculum, uiState, history }) => (
  <div>
    <div className="page-hero">
      <div className="page-hero-img page-hero-img-desaturate page-hero-img-dashboard" />
      <div className="page-hero-color-overlay page-hero-color-overlay-path-catalog" />
      <div className="page-hero-container">
        <h1 className="page-hero-name">DASHBOARD</h1>
        <h2 className="completion-text-big completion-text-big-topleft">Welcome back, {user.name}!</h2>
        <Metrics user={user} curriculum={curriculum} />
      </div>
    </div>
    <TabbedContent
      content={[{
        caption: 'In Progress',
        content: (
          <div>
            {user.curPathId !== '' ?
              <CurrentPathCard
                curPath={curriculum.paths[user.curPathId]}
                curriculum={curriculum}
                onViewClick={() => history.push(`/paths/${user.curPathId}`)}
                onContinueClick={courseId => history.push(`/paths/${user.curPathId}/${courseId}`)}
              /> : <div className="section">
                <div className="section-header">
                  <span>PATHS</span>
                  <h1>In Progress</h1>
                </div><NoPaths text="You haven't started any paths yet." showPathButton /></div>
              }
            {user.curPathId !== '' && Object.keys(curriculum.paths).filter(
                    pathId => !curriculum.paths[pathId].completed
                              && isInProgress(user, curriculum, pathId),
                  ).length !== 0 ?
                    <div className="section">
                      <hr />
                      <div className="section-header">
                        <span>PATHS</span>
                        <h1>In Progress</h1>
                      </div><PathList
                        pathIds={Object.keys(curriculum.paths).filter(
                          pathId => !curriculum.paths[pathId].completed
                                    && isInProgress(user, curriculum, pathId),
                        )}
                        curriculum={curriculum}
                      /></div> : null}
          </div>),
      }, {
        caption: 'Bookmarked',
        content: (
          <div className="section">
            <div className="section-header">
              <span>PATHS</span>
              <h1>Bookmarked</h1>
            </div>
            {user.bookmarkedPaths.length !== 0 ?
              <PathList
                pathIds={Object.keys(curriculum.paths).filter(
                  pathId => user.bookmarkedPaths.indexOf(pathId) !== -1,
                )}
                curriculum={curriculum}
              /> : <NoPaths text="You haven't bookmarked any paths yet." showPathButton />}
          </div>),
      }, {
        caption: 'Completed',
        content: (
          <div className="section">
            <div className="section-header">
              <span>PATHS</span>
              <h1>Completed</h1>
            </div>
            {Object.keys(curriculum.paths).filter(
                pathId => curriculum.paths[pathId].completed,
              ).length !== 0 ?
                <PathList
                  pathIds={Object.keys(curriculum.paths).filter(
                    pathId => curriculum.paths[pathId].completed,
                  )}
                  curriculum={curriculum}
                /> :
                <NoPaths text="You haven't completed any paths yet." />}
          </div>),
      }]}
      dispatch={dispatch}
      uiState={uiState}
    />
  </div>
);

CourseCardMini.propTypes = {
  course: PropTypes.objectOf(PropTypes.shape).isRequired,
  transparent: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  offset: PropTypes.bool,
};

CourseCardMini.defaultProps = {
  transparent: false,
  first: false,
  last: false,
  offset: false,
};

NoPaths.propTypes = {
  text: PropTypes.string.isRequired,
  showPathButton: PropTypes.bool,
};

NoPaths.defaultProps = {
  showPathButton: false,
};

Metrics.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

CurrentPathCard.propTypes = {
  curPath: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  onViewClick: PropTypes.func.isRequired,
  onContinueClick: PropTypes.func.isRequired,
};

PathCard.propTypes = {
  pathId: PropTypes.string.isRequired,
  path: PropTypes.objectOf(PropTypes.shape).isRequired,
};

PathList.propTypes = {
  pathIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

Dashboard.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape),
  curriculum: PropTypes.objectOf(PropTypes.shape),
  user: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.shape),
};

Dashboard.defaultProps = {
  uiState: null,
  curriculum: null,
  dispatch: null,
  user: null,
  history: null,
};

export default Dashboard;
