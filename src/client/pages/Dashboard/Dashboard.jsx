import React from 'react';
import PropTypes from 'prop-types';

import Card from '../shared/Card';

import TabbedContent from './TabbedContent';

// TODO: Add custom date formatting to make client and server side string match up
const Metrics = ({ name, nCompletedPaths, nCompletedCourses, nCompletedLessons, streak, lastVisited }) => (
  <div className="grid-full metrics">
    <h1>Welcome back, {name}!</h1>
    <h1>Completed Paths: {nCompletedPaths}</h1>
    <h1>Completed Courses: {nCompletedCourses}</h1>
    <h1>Completed Lessons: {nCompletedLessons}</h1>
    <h1>streak: {streak}</h1>
    <h1>lastVisited: {new Date(lastVisited).toLocaleString()}</h1>
  </div>
);

const CourseCardMini = ({ name, description, id }) => (
  <div className="grid-quarter card" >
    <div className="card-header" style={{ background: '#007399' }}>
      <i className="card-icon fa fa-line-chart" />
    </div>
    <span className="card-caption-small">COURSE</span>
    <span className="card-caption-big">{name}</span>
    <p className="card-text">{description}</p>
  </div>
);

const CurrentPathCard = ({ curPath }) => (
  <div className="section-card current-path">
    <div className="section-card-header" style={{ background: 'darkslateblue' }}>
      <span className="section-card-caption">CURRENT PATH</span>
      <h1 className="section-card-title">{curPath.name}</h1>
      <button className="current-path-view-button">VIEW PATH</button>
    </div>
    <div className="section-card-content">
      <p className="course-description">{curPath.description}</p>
      <div className="lesson-list">
        <CourseCardMini
          name="Sample Course Name"
          description="This is where the course description would be"
          id="sampleid"
        />
        <CourseCardMini
          name="Sample Course Name"
          description="This is where the course description would be"
          id="sampleid"
        />
        <CourseCardMini
          name="Sample Course Name"
          description="This is where the course description would be"
          id="sampleid"
        />
        <CourseCardMini
          name="Sample Course Name"
          description="This is where the course description would be"
          id="sampleid"
        />
        <button className="inline button-continue current-path-continue-button"><i />&nbsp;&nbsp; CONTINUE</button>
      </div>
    </div>
  </div>
);

const SectionCard = ({ title, subtitle, color, children }) => (
  <div className="section-card">
    <div className="section-card-header" style={{ background: color ? color : 'darkslateblue' }}>
      <span className="section-card-caption">{subtitle}</span>
      <h1 className="section-card-title">{title}</h1>
      <button className="section-card-button">VIEW ALL</button>
    </div>
    <div className="section-card-content">
      {children}
    </div>
  </div>
);

const PathCard = ({ name, description, id, nTotalCourses, nCompletedCourses }) => (
  <Card
    caption={name}
    subcaption="Path"
    text={description}
    to={`/paths/${id}`}
    icons={['fa fa-road']}
    color={'#007399'}
    content={<h1 className="completion-text">{nCompletedCourses}/{nTotalCourses}</h1>}
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
        if (user.completionStatus.completedLessons.indexOf(lessonId) !== -1) {
          inProgress = true;
        }
      });
    }
  });
  return inProgress;
};

const getCoursesCompletedNumber = (user, path) => {
  let nCompleted = 0;
  path.courseIds.forEach((courseId) => {
    if (user.completionStatus.completedCourses.indexOf(courseId) !== -1) {
      nCompleted += 1;
    }
  });
  return nCompleted;
};

const PathList = ({ user, paths }) => (
  <div className="dashboard-path-list">
    {paths.map(p => (
      <PathCard name={p.name} description={p.description} id={p.id} key={p.id} nTotalCourses={p.courseIds.length} nCompletedCourses={getCoursesCompletedNumber(user, p)}/>
    ))}
  </div>
);

const Dashboard = ({ dispatch, user, curriculum, uiState }) => (
  <div className="container">
    <div className="container-dashboard">
      <Metrics
        name={user.name}
        lastVisited={user.dayLastVisited}
        streak={user.streak}
        nCompletedPaths={user.completionStatus.completedPaths.length}
        nCompletedCourses={user.completionStatus.completedCourses.length}
        nCompletedLessons={user.completionStatus.completedLessons.length}
      />
      <TabbedContent
        content={[{
          caption: 'In Progress',
          content: (
            <div>
              <CurrentPathCard curPath={curriculum.paths[user.curPathId]} />
              <SectionCard title="In Progress" subtitle="PATHS">
                <PathList
                  user={user}
                  paths={Object.keys(curriculum.paths).filter(pathId => isInProgress(user, curriculum, pathId)).map(
                    pathId => curriculum.paths[pathId],
                  )}
                />
              </SectionCard>
            </div>),
        }, {
          caption: 'Bookmarked',
          content: (
            <SectionCard title="Bookmarked" subtitle="PATHS">
              <PathList
                user={user}
                paths={Object.keys(curriculum.paths).filter(pathId => user.bookmarkedPaths.indexOf(pathId) !== -1).map(
                  pathId => curriculum.paths[pathId],
                )}
              />
            </SectionCard>),
        }, {
          caption: 'Completed',
          content: (
            <SectionCard title="Completed" subtitle="PATHS">
              <PathList
                user={user}
                paths={Object.keys(curriculum.paths).filter(pathId => user.completionStatus.completedPaths.indexOf(pathId) !== -1).map(
                  pathId => curriculum.paths[pathId],
                )}
              />
            </SectionCard>),
        }, {
          caption: 'All Paths',
          content: (
            <SectionCard title="All" subtitle="PATHS">
              <PathList
                user={user}
                paths={Object.keys(curriculum.paths).map(
                  pathId => curriculum.paths[pathId],
                )}
              />
            </SectionCard>),
        }]}
        dispatch={dispatch}
        uiState={uiState}
      />
    </div>
  </div>
);

Metrics.propTypes = {
  name: PropTypes.string.isRequired,
  streak: PropTypes.number.isRequired,
  lastVisited: PropTypes.number.isRequired,
};

PathCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

PathList.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.shape).isRequired,
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
