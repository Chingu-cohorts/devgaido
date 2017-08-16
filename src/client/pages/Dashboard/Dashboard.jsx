import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import PageHero from '../shared/PageHero';
import TabbedContent from '../shared//TabbedContent';
import Metrics from './Metrics';
import InProgressTab from './InProgressTab';
import BookmarkedTab from './BookmarkedTab';
import CompletedTab from './CompletedTab';

import actions from '../../actions';

const { setCurrentDashboardTab } = actions;


const Dashboard = ({ user, curriculum, uiState }) => (
  <div>
    <Helmet
      title="Dashboard"
    />
    <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__dashboard" title="Dashboard">
      <Metrics user={user} curriculum={curriculum} />
    </PageHero>
    <TabbedContent
      content={[{
        caption: 'In Progress',
        content: <InProgressTab curriculum={curriculum} user={user} />,
      }, {
        caption: 'Bookmarked',
        content: <BookmarkedTab curriculum={curriculum} />,
      }, {
        caption: 'Completed',
        content: <CompletedTab curriculum={curriculum} />,
      }]}
      tabIndex={uiState.curDashboardTab}
      onClick={index => setCurrentDashboardTab(index)}
    />
  </div>
);

Dashboard.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Dashboard;
