import React from 'react';
import PropTypes from 'prop-types';
import TabbedContent from './TabbedContent';

const Card = ({ caption, subcaption, text, icons }) => (
  <div className="card colQuarter">
    <div className="cardHeader">
      <i />
      <i />
    </div>
    <span className="cardSmallCaption">{subcaption}</span>
    <span className="cardBigCaption">{caption}</span>
    <p className="cardText">{text}</p>
    <button className="cardButton" type="button">View</button>
  </div>
);

const PathList = ({ paths }) => (
  <div className="dashboardPathList">
    {paths.map(p => (
      <Card caption={p.name} subcaption="Path" text={p.description} key={p.id} />
    ))}
  </div>
);

const Dashboard = ({ dispatch, user, curriculum, uiState }) => (
  <div className="constrained marginTop">
    <h1>Welcome back, {user.name}!</h1>
    <h2>Recent</h2>
    <TabbedContent
      content={[{
        caption: 'My Paths',
        content: <PathList
          paths={curriculum.paths.filter(path => path.id === '10010')}
        />,
      }, {
        caption: 'Completed',
        content: <PathList
          paths={curriculum.paths.filter(path => path.id !== '10020')}
        />,
      }, {
        caption: 'All Paths',
        content: <PathList paths={curriculum.paths} />,
      }]}
      dispatch={dispatch}
      uiState={uiState}
    />
  </div>
);

Card.propTypes = {
  caption: PropTypes.string,
  subcaption: PropTypes.string,
  text: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.string),
};

Card.defaultProps = {
  caption: '',
  subcaption: '',
  text: '',
  icons: [],
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
