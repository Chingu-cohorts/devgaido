import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '../shared/Card';

import TabbedContent from './TabbedContent';

// TODO: Add custom date formatting to make client and server side string match up
const Metrics = ({ user, curriculum }) => (
  <div className="grid-full metrics">
    <h1>Welcome back, {user.name}!</h1>
    <h1>Completed Paths: {
      Object.keys(curriculum.paths).filter(
          pathId => curriculum.paths[pathId].completed,
      ).length}
    </h1>
    <h1>Completed Courses: {
      Object.keys(curriculum.courses).filter(
          courseId => curriculum.courses[courseId].completed,
      ).length}
    </h1>
    <h1>Completed Lessons: {
      Object.keys(curriculum.lessons).filter(
          lessonId => curriculum.lessons[lessonId].completed,
      ).length}
    </h1>
    <h1>streak: {user.streak}</h1>
    <h1>lastVisited: {new Date(user.dayLastVisited).toLocaleString()}</h1>
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
    <div className="section-card-header" style={{ background: 'darkslateblue' }}>
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
    <div className="section-card-header" style={{ background: color || 'darkslateblue' }}>
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
  <Card
    caption={path.name}
    subcaption="Path"
    text={path.description}
    linkTo={`/paths/${pathId}`}
    icons={['fa fa-road']}
    color={'#007399'}
    content={<h1 className="completion-text">{path.nCompleted}/{path.nTotal}</h1>}
    nCompleted={0}
    nTotal={8}
  />
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
  <div className="dashboard-path-list">
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
    <h1 className="no-paths-text">{text}</h1>
    {showPathButton ? <Link className="no-paths-button" to="/paths">Browse Paths</Link> : null}
  </div>
);

const Dashboard = ({ dispatch, user, curriculum, uiState }) => (
  <div className="container">
    <div className="container-dashboard">
      <Metrics user={user} curriculum={curriculum} />
      <TabbedContent
        content={[{
          caption: 'In Progress',
          content: (
            <div>
              {user.curPathId !== '' ?
                <CurrentPathCard
                  curPath={curriculum.paths[user.curPathId]}
                  curriculum={curriculum}
                /> :
                <SectionCard title="In Progress" subtitle="PATHS">
                  <NoPaths text="You haven't started any paths yet." showPathButton />
                </SectionCard>
                }
              {user.curPathId !== '' ?
                <SectionCard title="In Progress" subtitle="PATHS">
                  <PathList
                    pathIds={Object.keys(curriculum.paths).filter(
                      pathId => !curriculum.paths[pathId].completed
                                && isInProgress(user, curriculum, pathId),
                    )}
                    curriculum={curriculum}
                  />
                </SectionCard> : null}
            </div>),
        }, {
          caption: 'Bookmarked',
          content: (
            <SectionCard title="Bookmarked" subtitle="PATHS">
              {user.bookmarkedPaths.length !== 0 ?
                <PathList
                  pathIds={Object.keys(curriculum.paths).filter(
                    pathId => user.bookmarkedPaths.indexOf(pathId) !== -1,
                  )}
                  curriculum={curriculum}
                /> :
                <NoPaths text="You haven't bookmarked any paths yet." showPathButton />}
            </SectionCard>),
        }, {
          caption: 'Completed',
          content: (
            <SectionCard title="Completed" subtitle="PATHS">
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
            </SectionCard>),
        }]}
        dispatch={dispatch}
        uiState={uiState}
      />
    </div>
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
