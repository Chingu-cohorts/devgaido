import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import PageHero from '../shared/PageHero';
import TabbedContent from '../shared//TabbedContent';
import Metrics from './Metrics';
import InProgressTab from './InProgressTab';
import BookmarkedTab from './BookmarkedTab';
import CompletedTab from './CompletedTab';

import actions from '../../actions';

const { setCurrentDashboardTab } = actions;


const Dashboard = ({ uiState }) => (
  <div>
    <Helmet
      title="Dashboard"
    />
    <PageHero bgColorClass="bg-primary" bgUrl="/img/dashboard.jpg" title="Dashboard">
      <Metrics />
    </PageHero>
    <TabbedContent
      content={[{
        caption: 'In Progress',
        content: <InProgressTab />,
        buttonClass: 'button--accent',
      }, {
        caption: 'Bookmarked',
        content: <BookmarkedTab />,
        buttonClass: 'button--accent',
      }, {
        caption: 'Completed',
        content: <CompletedTab />,
        buttonClass: 'button--accent',
      }]}
      tabIndex={uiState.curDashboardTab}
      onClick={index => setCurrentDashboardTab(index)}
    />
  </div>
);

Dashboard.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  uiState: store.uiState,
}))(Dashboard);
