import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import TabbedContent from './TabbedContent';

// import { setCurrentDashboardPath } from './DashboardActions';

// TODO: Add custom date formatting to make client and server side string match up
const Metrics = ({ name, streak, lastVisited }) => (
  <div className="metrics">
    <h1>Welcome back, {name}!</h1>
    <h1>streak: {streak}</h1>
    <h1>lastVisited: {new Date(lastVisited).toLocaleString()}</h1>
  </div>
);

/* const DetailedCard = ({ caption, subcaption, text, icons }) => (
  <div className="card colFull">
    <div className="cardHeader" style={{ background: '#e13a7e' }}>
      <i />
      <i />
    </div>
    <span className="cardSmallCaption">{subcaption}</span>
    <span className="cardBigCaption">{caption}</span>
    <p className="cardText">{text}</p>
    <button className="cardButton" type="button">View</button>
  </div>
);*/

// TODO: Find a neat way of changing a cards color (dynamically add css class vs style tag?)
const Card = ({ caption, subcaption, text, selected, icons, to, onClick }) => (
  <Link className={`card colQuarter${selected ? ' selected' : ''}`} to={to}>
    <div className="cardHeader" style={{ background: '#ffea7e' }}>
      <i />
      <i />
    </div>
    <span className="cardSmallCaption">{subcaption}</span>
    <span className="cardBigCaption">{caption}</span>
    <p className="cardText">{text}</p>
    {/* <button className="cardButton" type="button">View</button> */}
  </Link>
);
/*
const handlePathCardClick = (dispatch, id) => {
  dispatch(setCurrentDashboardPath(id));
};*/

const PathCard = ({ selected, name, description, id, dispatch }) => (
  <Card
    // selected={selected}
    caption={name}
    subcaption="Path"
    text={description}
    key={id}
    to={`/paths/${id}`}
    // onClick={() => handlePathCardClick(dispatch, id)}
  />
);

const PathList = ({ curPathId, paths, dispatch }) => (
  <div>
    {/* <DetailedCard
      caption="Caption"
      subcaption="Path"
      text="PATH TEXT"
    />*/}
    <div className="dashboardPathList">
      {paths.map(p => (
        curPathId === p.id ?
          <PathCard selected name={p.name} description={p.description} id={p.id} dispatch={dispatch} key={p.id} /> :
          <PathCard selected={false} name={p.name} description={p.description} id={p.id} dispatch={dispatch} key={p.id} />
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
);

Metrics.propTypes = {
  name: PropTypes.string.isRequired,
  streak: PropTypes.number.isRequired,
  lastVisited: PropTypes.number.isRequired,
};

/* DetailedCard.propTypes = {
  caption: PropTypes.string.isRequired,
  subcaption: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icons: PropTypes.arrayOf(PropTypes.string),
};

DetailedCard.defaultProps = {
  caption: '',
  subcaption: '',
  text: '',
  icons: [],
};*/

Card.propTypes = {
  selected: PropTypes.bool,
  caption: PropTypes.string,
  subcaption: PropTypes.string,
  text: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

Card.defaultProps = {
  selected: false,
  caption: '',
  subcaption: '',
  text: '',
  icons: [],
  onClick: null,
};

PathCard.propTypes = {
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
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
