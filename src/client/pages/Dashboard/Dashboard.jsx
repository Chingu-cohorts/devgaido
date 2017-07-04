import React from 'react';
import PropTypes from 'prop-types';

import PageHero from '../shared/PageHero';
import TabbedContent from './TabbedContent';
import Metrics from './Metrics';
import InProgressTab from './InProgressTab';
import BookmarkedTab from './BookmarkedTab';
import CompletedTab from './CompletedTab';

const Dashboard = ({ dispatch, user, curriculum, uiState, history }) => (
  <div>
    <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__dashboard" title="Dashboard">
      <Metrics user={user} curriculum={curriculum} />
    </PageHero>
    <TabbedContent
      content={[{
        caption: 'In Progress',
        content: <InProgressTab curriculum={curriculum} user={user} history={history} />,
      }, {
        caption: 'Bookmarked',
        content: <BookmarkedTab curriculum={curriculum} user={user} />,
      }, {
        caption: 'Completed',
        content: <CompletedTab curriculum={curriculum} />,
      }]}
      dispatch={dispatch}
      uiState={uiState}
    />
  </div>
);

Dashboard.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape),
  curriculum: PropTypes.objectOf(PropTypes.shape),
  user: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.shape),
};

Dashboard.defaultProps = {
  uiState: null,
  curriculum: null,
  dispatch: null,
  user: null,
  history: null,
};

export default Dashboard;
