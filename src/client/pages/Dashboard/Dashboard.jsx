import React from 'react';
import PropTypes from 'prop-types';

import Card from '../shared/Card';

import TabbedContent from './TabbedContent';

// TODO: Add custom date formatting to make client and server side string match up
const Metrics = ({ name, streak, lastVisited }) => (
  <div className="grid-full metrics">
    <h1>Welcome back, {name}!</h1>
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

const CurrentPathCard = ({ name, description, id }) => (
  <div className="courseCard currentPath">
    <div className="courseCardHeader" style={{ background: 'darkslateblue' }}>
      <span className="courseCardCaption">CURRENT PATH</span>
      <h1>{name}</h1>
      <button className="currentPathViewButton">VIEW PATH</button>
    </div>
    <p className="courseDescription">{description}</p>
    <div className="lessonList">
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
      {/* getAllCourseLessons(curriculum.courses[id], curriculum).map(lesson => (
        <LessonCard
          name={lesson.name}
          description={lesson.description}
          id={lesson.id}
          type={lesson.type}
          key={lesson.id}
        />
      ))*/}
      <button className="inline button-continue currentPathContinueButton"><i />&nbsp;&nbsp; CONTINUE</button>
    </div>
  </div>
);

const SectionCard = ({ title, subtitle, color, children }) => (
  <div className="courseCard currentPath">
    <div className="courseCardHeader" style={{ background: color ? color : 'darkslateblue' }}>
      <span className="courseCardCaption">{subtitle}</span>
      <h1>{title}</h1>
      <button className="currentPathViewButton">VIEW ALL</button>
    </div>
    <div className="section-card-content">
      {children}
    </div>
  </div>
);

const PathCard = ({ name, description, id }) => (
  <Card
    caption={name}
    subcaption="Path"
    text={description}
    to={`/paths/${id}`}
    content={null}
    icons={['fa fa-road']}
    color={'#007399'}
  />
);

const PathList = ({ paths }) => (
    <div className="dashboard-path-list">
      {paths.map(p => (
        <PathCard name={p.name} description={p.description} id={p.id} key={p.id} />
      ))}
    </div>
);

const Dashboard = ({ dispatch, user, curriculum, uiState }) => (
  <div className="constrained marginTop">
    {/*<div className="container">
    <div className="container-dashboard">*/}
    <Metrics
      name={user.name}
      lastVisited={user.dayLastVisited}
      streak={user.streak}
    />
    <TabbedContent
      content={[{
        caption: 'In Progress',
        content: (
          <div>
            <CurrentPathCard
              name={curriculum.paths.buildawebsite.name}
              description={curriculum.paths.buildawebsite.description}
              id={curriculum.paths.buildawebsite.id}
            />
            <SectionCard title="In Progress" subtitle="PATHS">
              <PathList
                paths={Object.keys(curriculum.paths).filter(pathId => pathId === 'srcctrl').map(
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
              paths={Object.keys(curriculum.paths).filter(pathId => pathId !== 'buildawebsite').map(
                pathId => curriculum.paths[pathId],
              )}
            />
          </SectionCard>),
      }, {
        caption: 'Completed',
        content: (
          <SectionCard title="Completed" subtitle="PATHS">
            <PathList
              paths={Object.keys(curriculum.paths).filter(pathId => pathId !== 'srcctrl').map(
                pathId => curriculum.paths[pathId],
              )}
            />
          </SectionCard>),
      }, {
        caption: 'All Paths',
        content: (
          <SectionCard title="All" subtitle="PATHS">
            <PathList
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
