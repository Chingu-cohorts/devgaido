import React from 'react';
import PropTypes from 'prop-types';

import Card from '../shared/Card';

import TabbedContent from './TabbedContent';

// TODO: Add custom date formatting to make client and server side string match up
const Metrics = ({ name, streak, lastVisited }) => (
  <div className="metrics">
    <h1>Welcome back, {name}!</h1>
    <h1>streak: {streak}</h1>
    <h1>lastVisited: {new Date(lastVisited).toLocaleString()}</h1>
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
    color={'darkslateblue'}
  />
);

const PathList = ({ paths }) => (
  <div>{console.log(paths)}
    <div className="dashboardPathList">
      {paths.map(p => (
        <PathCard name={p.name} description={p.description} id={p.id} key={p.id} />
      ))}
    </div>
  </div>
);

const Dashboard = ({ dispatch, user, curriculum, uiState }) => (
  <div className="constrained marginTop">
    <Metrics
      name={user.name}
      lastVisited={user.dayLastVisited}
      streak={user.streak}
    />
    <TabbedContent
      content={[{
        caption: 'My Paths',
        content: <PathList
          paths={Object.keys(curriculum.paths).filter(pathId => pathId === 'srcctrl').map(
            pathId => curriculum.paths[pathId],
          )}
        />,
      }, {
        caption: 'Completed',
        content: <PathList
          paths={Object.keys(curriculum.paths).filter(pathId => pathId !== 'buildawebsite').map(
            pathId => curriculum.paths[pathId],
          )}
        />,
      }, {
        caption: 'All Paths',
        content: <PathList
          paths={Object.keys(curriculum.paths).map(
            pathId => curriculum.paths[pathId],
          )}
        />,
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
