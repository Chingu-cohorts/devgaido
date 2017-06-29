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

const CourseCardMini = ({ course }) => (
  <div className="grid-quarter card" >
    <div className="card-header" style={{ background: '#007399' }}>
      <i className="card-icon fa fa-line-chart" />
    </div>
    <span className="card-caption-small">COURSE</span>
    <span className="card-caption-big">{course.name}</span>
    <p className="card-text">{course.description}</p>
  </div>
);

const CurrentPathCard = ({ curPath, curriculum }) => (
  <div className="section-card current-path">
    <div className="section-card-header">
      <span className="section-card-caption">CURRENT PATH</span>
      <h1 className="section-card-title">{curPath.name}</h1>
      <button className="current-path-view-button">VIEW PATH</button>
    </div>
    <div className="section-card-content">
      <p className="course-description">{curPath.description}</p>
      <div className="lesson-list">
        {curPath.courseIds.map(courseId => (
          <CourseCardMini course={curriculum.courses[courseId]} key={courseId} />
        ))}
        <button className="inline button-continue current-path-continue-button"><i />&nbsp;&nbsp; CONTINUE</button>
      </div>
    </div>
  </div>
);

const SectionCard = ({ title, subtitle, color, children }) => (
  <div className="section-card">
    <div className="section-card-header">
      <span className="section-card-caption">{subtitle}</span>
      <h1 className="section-card-title">{title}</h1>
      <button className="section-card-button">VIEW ALL</button>
    </div>
    <div className="section-card-content">
      {children}
    </div>
  </div>
);

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

const Dashboard = ({ dispatch, user, curriculum, uiState }) => (
  <div>
    <div className="page-hero page-hero-compass">
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
              /> : <NoPaths text="You haven't started any paths yet." showPathButton />
              }
            {user.curPathId !== '' && Object.keys(curriculum.paths).filter(
                    pathId => !curriculum.paths[pathId].completed
                              && isInProgress(user, curriculum, pathId),
                  ).length !== 0 ?
                    <PathList
                      pathIds={Object.keys(curriculum.paths).filter(
                        pathId => !curriculum.paths[pathId].completed
                                  && isInProgress(user, curriculum, pathId),
                      )}
                      curriculum={curriculum}
                    /> : null}
          </div>),
      }, {
        caption: 'Bookmarked',
        content: (
          <div>
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
          <div>
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

SectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.objectOf(PropTypes.shape),
};

SectionCard.defaultProps = {
  color: null,
  children: null,
};

CourseCardMini.propTypes = {
  course: PropTypes.objectOf(PropTypes.shape).isRequired,
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
};

Dashboard.defaultProps = {
  uiState: null,
  curriculum: null,
  dispatch: null,
  user: null,
};

export default Dashboard;
