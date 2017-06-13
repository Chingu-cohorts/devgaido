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

const PathList = ({ curPathId, paths, dispatch }) => (
    <div className="dashboard-path-list">
      {paths.map(p => (
        curPathId === p.id ?
          <PathCard selected name={p.name} description={p.description} id={p.id} dispatch={dispatch} key={p.id} /> :
          <PathCard selected={false} name={p.name} description={p.description} id={p.id} dispatch={dispatch} key={p.id} />
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
      />
      <TabbedContent
        content={[{
          caption: 'My Paths',
          content: <PathList
            curPathId={uiState.Pages.Dashboard.currentPath}
            paths={curriculum.paths.filter(path => path.id === '10010')}
            dispatch={dispatch}
          />,
        }, {
          caption: 'Completed',
          content: <PathList
            curPathId={uiState.Pages.Dashboard.currentPath}
            paths={curriculum.paths.filter(path => path.id !== '10020')}
            dispatch={dispatch}
          />,
        }, {
          caption: 'All Paths',
          content: <PathList
            curPathId={uiState.Pages.Dashboard.currentPath}
            paths={curriculum.paths}
            dispatch={dispatch}
          />,
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
  curPathId: PropTypes.string.isRequired,
  paths: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
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
